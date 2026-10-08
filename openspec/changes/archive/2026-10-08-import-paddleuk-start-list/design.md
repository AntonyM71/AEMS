# Design

## Context

`POST /competition_management/upload` runs `read_start_list` (CSV/XLSX → DataFrame, Excel encodings and separators, blank-row drop), then `validate_columns_and_data_types`, then `process_competitors_df`. That last step writes the competition, events, Prelim phases, heats, athletes and athlete-heats in one transaction, and returns `(paddler_count, skipped_rows)`. `process_competitors_df` creates **one Athlete per DataFrame row**. Heats belong to the competition, not an event, and an athlete-heat links athlete + heat + phase.

A Paddle UK export is wide, with one row per athlete. See proposal.md (Why) and the spec delta for the layout and pairing rules.

## Goals / Non-Goals

**Goals:**
- Reuse the existing read and persist path. The only new code is a converter from the Paddle UK layout to the AEMS long layout.
- Leave AEMS-layout behaviour byte-for-byte unchanged, so every existing test passes without edits.

**Non-Goals:**
- Using Paddle UK's gender, age, or age-category columns (e.g. as affiliation or for seeding).
- Deduplicating athletes across rows by bib or name. One row is one athlete; that's the source's job.
- Accepting other governing-body formats, or adding a format registry. Add one when a second format turns up.
- Any API or schema change, so `buildApi.sh` isn't needed.

## Decisions

### Convert to the long layout, then reuse `process_competitors_df`
Two new functions go in `create_competition_from_xlsx.py`, beside `read_start_list`:

- `is_paddleuk_export(df) -> bool` checks for `Heat number Cat 1` among the stripped, lower-cased headers. It's the one header unique to Paddle UK; requiring `Bib number` too would make a file missing it fall through to AEMS validation instead of the 422 naming `Bib number` that the spec requires.
- `paddleuk_to_start_list(df, *, random_heats) -> tuple[pd.DataFrame, list[dict[str, str]]]` validates the Paddle UK columns and returns a long DataFrame plus pre-skipped entries. The DataFrame has `first_name`, `last_name`, `bib` (int), `Event`, `Heat` (str; absent under random heats) and `athlete_key`, with one row per paired athlete-event.

The endpoint branches once:

```python
competitors_df = read_start_list(file.filename, file.file.read())
if is_paddleuk_export(competitors_df):
    competitors_df, conversion_skips = paddleuk_to_start_list(competitors_df, random_heats=random_heats)
else:
    validate_columns_and_data_types(competitors_df, random_heats=random_heats)
    conversion_skips = []
...
skipped_rows = conversion_skips + skipped_rows
```

*Alternative considered:* a parallel `process_paddleuk_df` that writes to the DB directly. It's rejected because it would duplicate the event, phase, heat and transaction code, which would then drift.

*Alternative considered:* letting the operator pick a format on the form. The user chose auto-detection, and it needs no API or UI field.

### One athlete per source row via `athlete_key`
`process_competitors_df` keeps a dict `athlete_key → athlete_id`. It creates the Athlete only when it first sees a key, and creates an athlete-heat for every row. When the column is absent (AEMS layout), the key is the DataFrame index, which is unique per row, so behaviour is unchanged. `paddler_count` counts athletes created, not rows. That matches the existing "N athletes" message and the spec's "one athlete per row".

### Pairing algorithm (per athlete row)
```
entered  = [event columns with YES], stably sorted by running order Squirt, C1, OC1, K1
heats    = [non-blank heat cells]                   # heat-column order
prefixed = heats whose upper() starts with K1H/C1H/SQH/OCH
for heat in prefixed:  pair with first unpaired entered event of that boat type
for heat in the rest:  pair with first unpaired entered event
no event left → skipped (reason names heat)
leftover unpaired entered events → skipped (reason names event)
no entered events → skipped "not entered in any event", no athlete row emitted
```
An event column's boat type comes from its header prefix (`Squirt`, `C1`, `OC1`, `K1`), held in one module constant that is also the running order. Heat prefix to boat type: `K1H`→K1, `C1H`→C1, `SQH`→Squirt, `OCH`→OC1.

The real GB Freestyle Team Selections 2026 export showed that the heat columns follow the race running order, not the event-column order. Every multi-category athlete fitted C1 → OC1 → K1, and Squirt runs in parallel, so it can go at either end; it's put first. With column-order or exactly-one-candidate pairing, 15 of the 16 multi-category athletes were skipped. With running order, only a row that genuinely lacks a heat is. The order is fixed rather than a form setting until an event with a different order turns up. Unknown event-column prefixes aren't event columns, so a new Paddle UK column such as `HPP` is silently ignored, not misfiled.

Skipped-row dicts use the existing `{first_name, last_name, bib, reason}` shape, so the webapp's skipped-rows display works unchanged. Example reasons: `Heat 'SQH2' has no matching Squirt event`, `Heat '8' has no matching remaining event`, `No heat for event 'OC1'`, `Not entered in any event`.

Under `random_heats=True` the converter skips pairing. It emits one row per entered event with no `Heat` column, and `process_competitors_df`'s existing round-robin assigns heats per row, which is per athlete-event.

### Heat cell normalisation
`read_start_list` lets pandas infer dtypes. A heat column holding only numbers and blanks (e.g. `Heat Cat 2`) comes back as float, so `10` reads as `10.0`. The converter turns each non-blank heat cell into a trimmed string, and renders integral floats without the `.0`. Heat identity is that string, so `SQH2` and `sqh2` are different heats. Prefix *matching* is case-insensitive, but naming isn't rewritten. Heats are named `Heat <value>` by the existing `create_heats`.

### Validation reuses existing exceptions
Missing `First Name`/`Last Name`/`Bib number` raises `MissingColumnError`. Blank names, or a blank or non-integer bib, raise `ColumnTypeError`, with messages naming the Paddle UK column. The endpoint's existing `except` clause already maps these to 422.

## Risks / Trade-offs

- [Paddle UK renames `Heat number Cat 1` (e.g. to `Heat Cat 1`)] → detection fails and the file falls through to AEMS validation, which returns 422 "Column 'first_name' is missing". The operator sees an error, not bad data. Detection is one string in one function, so the fix is quick.
- [A file where every entry is skipped] → creates an empty competition and lists every skip, the same as an AEMS file whose rows all fail today. Acceptable; the operator can delete it.
- [An event runs in a different order (e.g. K1 before C1)] → unprefixed heats would be silently misfiled. Prefixing heats in the sheet overrides the order for those events; make the order a form setting if it happens.
- [An athlete in two events of the same boat type (K1 Men Senior and Junior)] → they're ranked by column order, which is a guess. This is unlikely, since the categories are by age.
- [Two rows for the same person] → two athletes. That's out of scope (see Non-Goals).
