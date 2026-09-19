# Proposal

## Why

`pdfEndpoints.py` generates three heavily-used, heavily-tested PDF reports (phase scores, heat draw/start list, heat results) with several non-obvious rules — confirmed/unconfirmed score styling, DNS rendering, filename sanitization against header injection — none of which are in `openspec/specs/`.

## What Changes

- Document the phase-scores report: per-athlete per-run scores, confirmed (locked) vs. unconfirmed styling, DNS rendering, total-score styling, and tie-break reason.
- Document the heat draw/start-list report: one page per heat, and its filename rule for one vs. multiple heats.
- Document the heat-results report: per-athlete per-run scores across the heat's maximum run count, with the same styling rules.
- Document that report filenames are sanitized before being used in the download response, and that missing/unresolvable heat ids are rejected with 404 before any PDF is generated.
- Document that any other failure while generating a report surfaces as HTTP 500 with the exception's message.
- No code changes — this backfills a spec for behavior that already exists and is already tested.

## Capabilities

### New Capabilities
- `pdf-reporting`: The three competition PDF reports (phase scores, heat draw/start list, heat results) and their shared filename-safety and error-handling rules.

### Modified Capabilities
(none)

## Impact

Documentation only. Grounded in `Server/app/competition_management/pdfEndpoints.py` and `Server/app/competition_management/tests/test_pdfEndpoints.py`. No application code, migrations, or APIs change.
