# Design

## Context

See `proposal.md` for the failure modes. Five facts shape the approach:

- `_persist_athlete_score` replaces a judge's whole score by deleting the rows matching
  heat/athlete/run/judge and inserting the body. No row represents "this judge's score for
  this run", so there is nothing to lock and nothing to version.
- Redux, not the server's response, drives the scribe screen, and every edit submits the
  complete list. A newer submission therefore contains everything an older one holds, so
  discarding an older one whole loses nothing.
- The venue runs offline. Scribe tablets get no NTP, and Wi-Fi-only ones free-run on a quartz
  RTC from whenever they were last online, drifting seconds per day.
- Postgres 17. Native `uuidv7()` arrives in Postgres 18, so generating v7 server-side would
  mean hand-rolling it.
- `Server/conftest.py` mocks the session, so no backend test can observe a transaction, a
  lock, or a constraint.

## Goals / Non-Goals

**Goals:**

- One stored state per judge per run, never a mixture of two submissions.
- A submission older than what is already applied changes nothing.
- One clock orders the whole system, whatever each device believes the time is.
- Rejections reach the client and stay rejected.

**Non-Goals:**

- Reconciling the scribe screen after a rejection. The screen keeps following Redux, and the
  next edit resubmits the full state.
- Debouncing the submit effect. Once ordering holds, extra submissions waste bandwidth instead
  of corrupting data.
- Changing the retry policy in `emptyApi.ts`. Retries become useful again: one can no longer
  corrupt anything, and a retry of a genuinely dropped final write still lands while nothing
  newer has arrived.
- Ordering run-status messages. Uniqueness makes them idempotent, which suffices for head
  judge actions at human pace.

## Decisions

### Ordering rides on a submission identifier, not on the submitted moves

Nothing in the payload can order submissions. A watermark taken from the newest surviving move
runs *backwards* when the scribe deletes that move, holds still when only a bonus toggles, and
vanishes when the submission is empty. ADR010 records the six alternatives and how each fails.

### The identifier is a UUIDv7 stamped from the server's clock

UUIDv7 sorts byte-wise in timestamp order, so Postgres `uuid` comparison is time comparison
with no second column, and its random low bits separate submissions minted in one millisecond.

The timestamp comes from the server. The client reads the `Date` header once, keeps
`serverOffset = serverDate - Date.now()`, and mints with
`v7({ msecs: Date.now() + serverOffset })`. One clock now orders every device, which removes
tablet drift, a replacement tablet mid-heat, and the case with no ceiling: a fast tablet
writing a watermark into the future and locking out every device that follows it on that key.
Because one clock orders everything, the design needs no staleness escape hatch.

Reject an identifier whose version nibble is not 7. A UUIDv4 in the comparison column compares
as a random number and would beat or lose to every later submission arbitrarily, and a tablet
on a stale cached bundle sending v4 is realistic at an offline venue.

### One statement does the compare-and-set, the lock and the watermark write

```sql
INSERT INTO run_updates (heat_id, athlete_id, phase_id, run_number, judge_id, request_id)
VALUES (:heat_id, :athlete_id, :phase_id, :run_number, :judge_id, :request_id)
ON CONFLICT (heat_id, athlete_id, phase_id, run_number, judge_id)
  DO UPDATE SET request_id = EXCLUDED.request_id
  WHERE run_updates.request_id < EXCLUDED.request_id
RETURNING request_id;
```

An empty result means the submission is stale: answer `409` and stop. A returned row means the
transaction holds that row's lock for its remainder, so the delete-and-insert that follows
cannot interleave with another submission for the same key. Different judges hold different
rows and still run concurrently.

This replaces the advisory lock the original issue proposed. An advisory lock serialises but
stores nothing, so the watermark would need a row anyway; one row does both jobs.

### Run status gets a unique constraint and an upsert

The run-status key omits the judge, because a run's lock and did-not-start state belong to the
run. A unique constraint makes duplicates impossible, and `ON CONFLICT DO UPDATE` replaces the
query-then-insert in `copy_message_to_db`. These messages need no ordering: each carries the
full status, so last-writer-wins on one row is correct.

### Locked-run rejection becomes 409

`update_athlete_score` wraps every failure in a `500`, which RTK Query retries five times in
production. Both rejections — locked run and stale submission — are final for that submission,
so both answer `409` and neither is retried.

## Risks / Trade-offs

- **The `Date` header resolves to one second and includes latency** → Ordering needs
  consistency, not accuracy. Every device offsets against the same clock, so a shared constant
  error is harmless, and sub-second error cannot reorder one device's submissions because the
  offset applies to a monotonically advancing local clock.
- **The offset is read once, and a long session drifts** → Tablet RTC drift runs seconds per
  day against a session lasting hours. Re-reading the header on every response would erase even
  that, at the cost of touching the base query. Defer until measured.
- **The duplicate-resolution migration destroys rows** → Duplicate run statuses are the bug,
  and the head judge's screen can reconstruct them. Where duplicates disagree the migration
  keeps the row with `locked` set, since locking is the action with consequences, and logs what
  it removed.
- **Rejecting v4 breaks a half-upgraded client** → The server accepts a missing identifier but
  rejects a v4 one, so a client minting v4 would fail hard. Ship the v7 minting and the version
  check together, and no such client exists.
- **No backend test can see any of this** → Interleaving, constraint enforcement and ordering
  under concurrency are all invisible against a mocked session, so the coverage lives in the
  Playwright e2e suite against the running stack.

## Migration Plan

1. Migration A resolves duplicate run statuses, then adds the unique constraint.
2. Migration B creates `run_updates`.
3. Deploy the server. It accepts submissions with or without an identifier, so existing clients
   keep working.
4. Deploy the webapp, which starts sending identifiers.

To roll back, drop the webapp first; the server tolerates clients that send no identifier.
Rolling the server back re-opens the races but loses no data, leaving `run_updates` unread.

## Open Questions

- Whether the scribe should show a `409` to the user, or rely silently on the next edit to
  resubmit. This changes no requirement and no task, and practice will answer it better than
  argument.
