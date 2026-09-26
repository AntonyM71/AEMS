# Architectural Decision Record: Ordering Judge Score Submissions With a Server-Stamped Identifier

## Context:

The scribe screen submits a judge's **complete** move and bonus list on every edit, and the
server applies each submission as an unconditional delete-and-replace for that judge's run.
Nothing in a submission says when the scribe made it: no version, no timestamp, no sequence.
Whichever request arrives last wins.

That is unsafe on this channel. The frontend retries a failed submission five times in
production, backing off across 10 to 25 seconds, and resends the body captured when the
mutation was dispatched. A newer edit cancels nothing, because the query layer dedupes reads
rather than writes. So a retry carrying an old list can land after a newer list and overwrite
it. The scribe screen still shows the right score, because Redux drives the screen; the
database, the live results and the broadcast overlay show the stale one.

Two submissions for one judge's run can also overlap outright, because the replace deletes and
then inserts without serialising, and no record represents "this judge's score for this run"
to lock. Run statuses have the same shape: a read-then-write with no uniqueness behind it, so
concurrent messages can leave two rows describing one run.

Any fix must work where AEMS actually runs: a venue with no internet, so scribe tablets get no
NTP. Wi-Fi-only tablets free-run on a quartz RTC, drifting roughly a second or two a day on a
decent crystal and several times that on a cheap or temperature-stressed one, from whenever
they last saw a network. Cellular tablets correct themselves from the carrier signal, but
Wi-Fi-only models have no such path, and running NTP on the venue network cannot help, because
stock Android and iOS refuse to take their system clock from an arbitrary server without
device management.

## Options Considered:

### 1. Debounce the Submit Effect and Disable Retries

- Small, and needs no schema change
- Collapses tap bursts into one submission and ends the retry storm
- Narrows the race window instead of closing it
- Loses a genuinely dropped final write with no recovery, which is the exposure that matters:
  once the head judge locks the run, nothing resends the state

### 2. Order by the Submitted Move and Bonus Identifiers

Move and bonus identifiers are already minted at tap time, so making them time-ordered and
comparing the newest against the stored one looks like free ordering.

- Adds nothing to the request
- Breaks on deletion: removing the newest move leaves the next submission's newest identifier
  *older* than the stored one, so the server rejects the deletion and the move returns
- Breaks on bonus toggles: bonuses leave the move list untouched, so two submissions can carry
  identical move identifiers and no ordering information at all
- Breaks on an empty submission, which carries nothing to compare

Such an identifier tracks the newest *surviving element* rather than the newest *action*. The
two diverge precisely when something is removed.

### 3. Per-Element Merge Semantics

Merge instead of replacing: insert elements the request holds and the database lacks; for
elements the database holds and the request lacks, delete only when the stored element is
older than the request itself, since a request built before an element existed never dropped
it.

- Tells a real deletion from a stale request's ignorance
- Still needs a watermark to stop a stale retry re-adding an element a newer request deleted,
  so it saves no record
- Costs time-ordered identifiers on every element, a watermark, three interacting rules and
  the lock
- Earns nothing here: submissions carry full state, so a stale request never holds information
  a newer one lacks, and the machinery exists to salvage what does not exist

This is the right design for **delta** submissions and wasted on full-state ones.

### 4. Compare-and-Swap on Expected State

Send the identity of the state the client believes the server holds, and reject on mismatch.

- Standard optimistic concurrency, familiar from conditional HTTP requests
- Deadlocks on a lossy channel: after a failed submission the client cannot know whether it
  landed, so its expectation is wrong and the server rejects everything after it until the
  client refetches and rebases
- Fights the design that makes Redux, not the server, authoritative for the scribe screen

### 5. A Database Advisory Lock

Serialise on a Postgres transaction advisory lock keyed by the judge's run.

- Small, and different judges still submit concurrently
- Fixes interleaving but not ordering: two serialised writes in the wrong order still let the
  stale one win
- Stores nothing, so a watermark would need its own record, and that record can take the lock
  instead

### 6. A Device-Clock Identifier With a Staleness Escape Hatch

Stamp from the tablet's clock, and to survive skew accept an out-of-order submission anyway
once the stored watermark has sat untouched for some window of server time.

- Keeps the client simple
- Disruption equals the skew, which for ordinary drift means seconds to a minute — tolerable
- Turns vicious in the tail: a tablet running *fast* writes a watermark into the future and
  then leaves, locking out every correctly-set device that follows it on that judge slot.
  Swapping in a good tablet fixes nothing
- Has no ceiling where an RTC lost power and reset to its firmware's build date
- Costs a tuned window that is a guess

### 7. Carry the Watermark on the Existing Run Status Record

Run statuses already describe a run, and this change gives them uniqueness anyway, so hanging
the watermark there would avoid a new record entirely.

- Reuses a record the change already touches
- Wrong grain: the watermark answers "has a newer snapshot of **this judge's** score been
  applied?", while a run status describes the run. Sharing one watermark across judges rejects
  a judge's first submission whenever another judge's lands ahead of it, losing that judge's
  score silently
- Adding the judge to the run status contradicts the uniqueness this change introduces, and
  breaks did-not-start scoring, which builds one run from each status row and would see one
  per judge
- Wrong lifecycle: a run status exists only once the head judge locks the run or marks it
  did-not-start, which happens after the scoring it would have to order

### 8. A Server-Stamped Time-Ordered Identifier Compared Against a Watermark (Chosen Option)

- One clock orders the whole system, so device drift, tablet replacement and fast-clock
  poisoning stop being failure modes rather than being mitigated
- Settles the comparison, takes the serialising lock and advances the watermark together
- Gives the watermark record the second job of being the missing parent record, so ordering
  and interleaving fall to one mechanism

## Decision:

We will keep a watermark record for each judge's run, holding the identifier of the most
recent submission applied to it. The scribe mints a time-ordered identifier for each
submission and sends it with the body; a retry resends the identifier its submission was
created with, so a retry keeps the time it was born at.

The time in that identifier comes from the **server's** clock, not the tablet's. The client
derives its offset from the server once, from a header every response already carries, and
applies that offset when minting. Devices therefore never contribute their own clocks to the
ordering.

The server applies a submission only when its identifier beats the watermark. It settles that
comparison and claims the watermark in one conditional write, which also locks the record for
the rest of the transaction, so the delete-and-replace that follows cannot interleave with
another submission for the same judge's run. A submission that loses the comparison is
answered as a conflict and changes nothing. Watermarks for different judges are different
records, so judges still submit concurrently.

Separately, run statuses gain uniqueness over the run and are written as an upsert, after a
migration resolves existing duplicates. They need no ordering: each message carries the full
status, so last-writer-wins on one record is correct.

The mechanics — the statement, the schema and the migration order — live in the OpenSpec
change `fix-score-write-races`, under `design.md`.

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

Taking the time from the server keeps device clocks out of the ordering altogether. That costs
a few lines on the client and no new endpoint, against the tuned window and residual unbounded
tail that option 6 needs.

### A Time-Ordered Identifier Sorts in the Database Unaided

A UUID whose leading bytes carry its timestamp sorts byte-wise in time order, so the database
compares identifiers as times without a second column, and its random low bits separate
submissions minted within the same millisecond, which a bare timestamp cannot. The price is
that a random UUID in the same column would compare arbitrarily, so the server rejects any
identifier that is not of the time-ordered kind. Generation stays on the client, which also
avoids depending on a database version new enough to generate these itself.

### The Lock Falls Out of the Watermark

The advisory lock in option 5 and the watermark solve two halves of one problem, and each needs
a key. Making the watermark record the lock target collapses them and lets the database enforce
the invariant instead of application code.

## Consequences:

- The score submission endpoint gains a required identifier. The server rejects a submission
  that is missing one, or that carries anything but a v7 UUID, as a `422`. The stack deploys as
  one Docker Compose unit, so server and webapp always land on the same commit — there is no
  rollout window or independent rollback to design for.
- Stale submissions and locked-run submissions are both answered as conflicts rather than
  server errors, so neither is retried. A locked-run rejection previously triggered five more
  attempts.
- Debouncing and retry suppression become unnecessary. With ordering enforced a retry can
  corrupt nothing, and a retry of a genuinely dropped final write still lands while nothing
  newer has arrived, so the retry policy stays as it is.
- The frontend needs a UUID library that generates the time-ordered form.
- This design rests on transaction behaviour, constraint enforcement and concurrency, none of
  which the backend suite can observe while it mocks the database session, so the coverage
  lives in the end-to-end suite against a running stack.
