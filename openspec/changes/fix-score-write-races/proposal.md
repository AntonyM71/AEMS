# Proposal

## Why

A judge's score can land in the database stale, and nothing detects it.

Every edit on the scribe screen posts the judge's complete move and bonus list, and the server
applies each post as an unconditional delete-and-replace. RTK Query retries a failed post for
10 to 25 seconds, resending the body it was dispatched with. A retry carrying an old list can
therefore land after a newer list and overwrite it. The scribe screen still shows the right
score, because Redux drives the screen; the database, the live results and the broadcast
overlay show the stale one. The damage sticks on the last edit of a run, because once the head
judge locks the run nothing resends the correct state.

Two writes for one judge's run can also overlap. The replace deletes and then inserts without
serialising, and no row represents "this judge's score for this run", so both transactions can
commit and leave moves from two snapshots interleaved. Run statuses fail the same way: a
query-then-insert with no unique constraint behind it lets concurrent messages create two rows
for one run, after which lock and did-not-start checks read whichever row comes back first.

## What Changes

- Add a `run_updates` table holding one row per heat/athlete/phase/run/judge, carrying the
  identifier of the most recent submission applied for that key. The row is both the ordering
  watermark and the parent record the replace can lock on.
- Have the scribe mint a UUIDv7 identifier per submission and send it in the body. The server
  applies the submission only if the identifier beats the stored watermark, and answers
  `409 Conflict` otherwise.
- Stamp that identifier from the **server's** clock, read from the `Date` header every HTTP
  response already carries, so every device orders submissions by one clock.
- Perform the comparison as one `INSERT ... ON CONFLICT DO UPDATE ... WHERE ... RETURNING`,
  which does the compare-and-set, takes the row lock that serialises the replace, and writes
  the watermark together.
- Add a unique constraint on the run-status key (heat, phase, athlete, run), preceded by a
  migration that resolves existing duplicates, and replace the query-then-insert with an
  upsert.
- Answer `409` rather than `500` when a submission targets a locked run, so a rejection stops
  triggering five more retries.
- Cover overlapping and out-of-order submissions with tests that exercise real request
  ordering rather than mocked sessions.

Nothing breaks. The identifier is additive, and the server treats a submission without one as
newest, so old clients keep working through a rollout.

## Capabilities

### New Capabilities

None. This changes how existing judging behaviour is persisted, not what the system does.

### Modified Capabilities

- `judging-workflow`: adds requirements that the server applies a judge's submissions in the
  order the scribe made them, rejects out-of-order submissions rather than applying them,
  serialises concurrent submissions for one judge's run, and stores at most one status per
  run. Modifies the locked-run requirement to name a conflict response rather than an
  unspecified error.

## Impact

- **Server**: `customScoringEndpoints.py` (`_persist_athlete_score`, `update_athlete_score`,
  `copy_message_to_db`), `db/models.py` (new `RunUpdate` model, unique constraint on
  `RunStatus`), and two Alembic migrations — one resolving duplicate run statuses before
  adding its constraint, one creating `run_updates`.
- **Webapp**: `Scribe.tsx` mints and sends the identifier and handles `409`; a small helper
  holds the server-clock offset; `uuid` moves past `^9.0.0`, which predates `v7`.
- **API contract**: the body of
  `POST /addUpdateAthleteScore/{heat_id}/{athlete_id}/{run_number}/{judge_id}` gains an
  optional field, so `buildApi.sh` must run again and regenerate `Common/openapi.json`.
- **Scoring**: the math is unchanged, but did-not-start and locked-run behaviour stops
  depending on which duplicate run-status row happens to be read first.
- **Decision record**: ADR010 records why ordering rides on a server-stamped identifier rather
  than on anything derivable from the submitted moves. Six plausible alternatives fail, and
  how they fail is worth keeping.
