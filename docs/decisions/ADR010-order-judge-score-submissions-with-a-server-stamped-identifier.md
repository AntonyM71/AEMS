# Architectural Decision Record: Ordering Judge Score Submissions With a Server-Stamped Identifier

## Context:

The scribe screen submits a judge's **complete** move and bonus list on every edit, and the
server applies each submission as an unconditional delete-and-replace for that
heat/athlete/run/judge. Nothing in a submission says when the scribe made it: no version, no
timestamp, no sequence. Whichever request arrives last wins.

That is unsafe on this channel. RTK Query retries a failed submission five times in
production, backing off across 10 to 25 seconds, and resends the body captured when the
mutation was dispatched. A newer mutation cancels nothing, because RTK Query dedupes queries
rather than mutations. So a retry carrying an old list can land after a newer list and
overwrite it. The scribe screen still shows the right score, because Redux drives the screen;
the database, the live results and the broadcast overlay show the stale one.

Two submissions for one key can also overlap outright, because the replace deletes and then
inserts without serialising, and no row represents "this judge's score for this run" to lock.

Any fix must work where AEMS actually runs: a venue with no internet, so scribe tablets get no
NTP. Wi-Fi-only tablets free-run on a quartz RTC, drifting about 1.7 seconds a day on a decent
crystal and several times that on a cheap or temperature-stressed one, from whenever they last
saw a network. Cellular tablets correct themselves over NITZ, but Wi-Fi-only models have no
such path, and a local NTP server on the venue LAN cannot help, because stock Android and iOS
refuse to take their system clock from an arbitrary server without MDM.

## Options Considered:

### 1. Debounce the Submit Effect and Disable Retries

- About three lines, and no schema change
- Collapses tap bursts into one submission and ends the retry storm
- Narrows the race window instead of closing it
- Loses a genuinely dropped final write with no recovery, which is the exposure that matters:
  once the head judge locks the run, nothing resends the state

### 2. Order by the Submitted Move and Bonus Identifiers

Move and bonus ids are already minted at tap time, so making them UUIDv7 and comparing the
newest against the stored one looks like free ordering.

- Adds no field to the request
- Breaks on deletion: removing the newest move leaves the next submission's newest id *older*
  than the stored one, so the server rejects the deletion and the move returns
- Breaks on bonus toggles: bonuses leave the move list untouched, so two submissions can carry
  identical move ids and no ordering information at all
- Breaks on an empty submission, which carries no id to compare

Such an identifier tracks the newest *surviving element* rather than the newest *action*. The
two diverge precisely when something is removed.

### 3. Per-Element Merge Semantics

Merge instead of replacing: insert ids the request holds and the database lacks; for ids the
database holds and the request lacks, delete only when the stored element is *older* than the
request's own identifier, since a request built before an element existed never dropped it.

- Tells a real deletion from a stale request's ignorance
- Still needs a watermark to stop a stale retry re-adding an element a newer request deleted,
  so it saves no table
- Costs per-element UUIDv7, a watermark, three interacting rules and the lock
- Earns nothing here: submissions carry full state, so a stale request never holds information
  a newer one lacks, and the machinery exists to salvage what does not exist

This is the right design for **delta** submissions and wasted on full-state ones.

### 4. Compare-and-Swap on Expected State

Send the identity of the state the client believes the server holds, and reject on mismatch.

- Standard optimistic concurrency, familiar from HTTP `If-Match`
- Deadlocks on a lossy channel: after a failed submission the client cannot know whether it
  landed, so its expectation is wrong and the server rejects everything after it until the
  client refetches and rebases
- Fights the design that makes Redux, not the server, authoritative for the scribe screen

### 5. A Postgres Transaction Advisory Lock

Serialise on `pg_advisory_xact_lock` keyed by heat, athlete, phase, run and judge.

- One line, and different judges still submit concurrently
- Fixes interleaving but not ordering: two serialised writes in the wrong order still let the
  stale one win
- Stores nothing, so a watermark would need its own row, and that row can take the lock instead

### 6. A Device-Clock Identifier With a Staleness Escape Hatch

Stamp from the tablet's clock, and to survive skew accept an out-of-order submission anyway
once the stored watermark has sat untouched for some window of server time.

- Keeps the client simple
- Disruption equals the skew, which for ordinary drift means seconds to a minute — tolerable
- Turns vicious in the tail: a tablet running *fast* writes a watermark into the future and
  then leaves, locking out every correctly-set device that follows it on that key. Swapping in
  a good tablet fixes nothing
- Has no ceiling at all where an RTC lost power and reset to the ROM build date
- Costs an extra column and a tuned window that is a guess

### 7. A Server-Stamped UUIDv7 With an Upsert Compare-and-Set (Chosen Option)

- One clock orders the whole system, so device drift, tablet replacement and fast-clock
  poisoning stop being failure modes rather than being mitigated
- Does the compare-and-set, the serialising row lock and the watermark write in one statement
- Gives the watermark row the second job of being the missing parent record, so ordering and
  interleaving fall to one mechanism

## Decision:

We will add a `run_updates` table holding one row per heat/athlete/phase/run/judge, carrying
the identifier of the most recent submission applied for that key.

The scribe mints a UUIDv7 identifier per submission and sends it in the body. A retry resends
the identifier its submission was dispatched with, which is exactly right: a retry keeps the
time it was born at. The timestamp feeding that UUID comes from the **server's** clock, read
once from the `Date` header every HTTP response already carries and kept as
`serverOffset = serverDate - Date.now()`.

The server applies a submission only when its identifier beats the stored watermark, in one
statement:

```sql
INSERT INTO run_updates (heat_id, athlete_id, phase_id, run_number, judge_id, request_id)
VALUES (...)
ON CONFLICT (heat_id, athlete_id, phase_id, run_number, judge_id)
  DO UPDATE SET request_id = EXCLUDED.request_id
  WHERE run_updates.request_id < EXCLUDED.request_id
RETURNING request_id;
```

An empty result means the submission is stale: answer `409 Conflict` and touch nothing. A
returned row means the transaction holds that row's lock for its remainder, so the
delete-and-insert cannot interleave with another submission for the same key.

Separately, run statuses gain a unique constraint on (heat, phase, athlete, run) and an
upsert, preceded by a migration that resolves existing duplicates. They need no ordering: each
message carries the full status, so last-writer-wins on one row is correct.

## Rationale:

### Ordering Belongs to the Action, Not the Payload

Every failure in options 2 and 3 follows from reading a clock off the submission's contents.
An identifier minted per submission describes the act of submitting, so deletions, bonus
toggles and empty submissions all order correctly without special cases.

### Full-State Submissions Make Wholesale Rejection Lossless

Each submission carries the judge's complete list, so a newer one contains everything an older
one holds. Discarding a stale submission entire therefore loses nothing, and that is what lets
a single comparison replace per-element reconciliation.

### One Clock Removes a Class of Failures Instead of Bounding It

Taking the timestamp from the server keeps device clocks out of the ordering altogether. That
costs about five lines on the client and no new endpoint, against the extra column, tuned
window and residual unbounded tail that option 6 needs.

### UUIDv7 Sorts in Postgres Unaided

Postgres compares `uuid` byte-wise, and UUIDv7 puts its 48-bit timestamp in the leading bytes
big-endian, so ordering the column *is* ordering by time. The random low bits separate
submissions minted in one millisecond, which a bare millisecond timestamp cannot. The price is
that a UUIDv4 in the same column compares as a random number, so the server rejects any
identifier whose version nibble is not 7.

### The Lock Falls Out of the Watermark

The advisory lock in option 5 and the watermark solve two halves of one problem, and each needs
a key. Making the watermark row the lock target collapses them and lets Postgres enforce the
invariant instead of application code.

## Consequences:

- `POST /addUpdateAthleteScore/...` gains an optional `request_id`. The server treats a missing
  identifier as newest, so a mixed fleet survives a rollout and the webapp can roll back
  independently of the server.
- Stale submissions and locked-run submissions both answer `409` rather than `500`, so neither
  is retried. A locked-run rejection previously triggered five more attempts.
- Debouncing and retry suppression become unnecessary. With ordering enforced a retry can
  corrupt nothing, and a retry of a genuinely dropped final write still lands while nothing
  newer has arrived, so `emptyApi.ts` stays as it is.
- `uuid` must move past `^9.0.0`, which predates `v7`.
- This design rests on transaction behaviour, constraint enforcement and concurrency, none of
  which the backend suite can observe while it mocks the session, so the coverage lives in the
  Playwright e2e suite.
- Postgres 17 has no native `uuidv7()`, which arrives in 18, and needs none: the client mints
  the identifier and the database only compares it.
