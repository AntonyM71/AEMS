# Event-Loop Regression Guards — Implemented

**Goal:** Make CI fail if a change puts blocking work back on the ASGI event loop.

**Status:** Done. Both guards are in place and Phase 3 of
`2026-09-13-fix-blocking-event-loop-handlers.md` has landed, so no route handler
runs database work on the event loop any more.

## What shipped

- [x] `Server/test_blocking_route_handlers.py` — asserts no route is `async def`
      while resolving a database session, since FastAPI only moves plain `def`
      handlers to its threadpool. No database, no timing, covers every route.
      One documented exception, `update_athlete_score`, which is legitimately
      async because it awaits a Socket.IO emit and offloads its own blocking
      work with `anyio.to_thread`.
- [x] `Server/performance/test_event_loop_concurrency.py` — fires each heavy
      endpoint alongside one real light request and asserts the light one did
      not have to wait. Covers all three PDF endpoints, both score
      calculations, and the score submission.
- [x] Phase 3: 28 handlers converted from `async def` to `def` across
      `app/crud/`, `app/scoresheetEndpoints.py`, `promote_phase` and
      `health_check`. None contained an `await`, so all were a straight
      conversion, and no existing test needed changing.

## Evidence the underlying problem is fixed

Measured against the real app, real Postgres and the seeded bench phase. The
"blocked" column comes from calling the same real PDF function from an
`async def` route, which is what the code used to do.

| While one `phase_pdf` request runs | Blocked | Fixed |
|---|---|---|
| Other requests completed | 1 | 76 |
| Their median latency | 233ms | 3.8ms |
| Score submissions accepted, one judge | 1 | 4 |
| Median score submission latency | 249ms | 52ms |

## Why the timing test looks the way it does

Several obvious-looking designs were tried and measured first. Each failed for a
reason worth not rediscovering.

- **Fire one concurrent request, not many.** The previous test fired ten score
  submissions. Ten of them compete with the heavy request for the interpreter
  lock, leaving a 1.05x margin against a 0.5 threshold, so correct code failed
  its own test. One submission leaves 2.0x.

  | Concurrent submissions | Blocked | Healthy worst |
  |---|---|---|
  | 1 | 1.00 | 0.50 |
  | 10 | 1.00 | 0.95 |

- **"N concurrent shouldn't cost N times solo" does not work here.** Measured at
  0.82 healthy against 0.88 blocked for submissions, and 1.14 against 1.07 for
  score calculations. Nothing to assert on. The SQLAlchemy pool defaults to 5
  connections, so ten concurrent requests queue on connections regardless of the
  event loop, and the score calculation is pure-Python aggregation whose threads
  never overlap.

- **A blocked loop pins the ratio at 1.0 by construction.** The light request
  cannot finish ahead of the heavy one it is stuck behind, on any hardware. Only
  the passing side varies, which is why an 80% threshold is safe: measured
  healthy values run from 9% to 58%.

- **The median of three attempts, not a single reading.** The score calculations
  sit at a median of 0.35 with a p90 of 0.37, but occasional runs spike toward
  0.72 from scheduling noise.

- **Yield after creating the heavy request.** `asyncio.create_task` only
  schedules it. Without `await asyncio.sleep(0)` the light request reaches the
  server first and the heavy one is not yet in flight.

- **Never re-read the clock after an `await`.** On a blocked loop that await does
  not return until the block is over, which hides the very thing under test.

- **Clear `PYTEST_CURRENT_TEST`.** `pdfEndpoints` skips real font loading under
  pytest, which halves a PDF's cost and with it the margin.

## Verified by deliberate regression

Every guard was watched failing, not assumed to work.

- Each of the six heavy endpoints was reverted individually, including removing
  the thread offloading from the score submission. Every one failed its own test.
- Five Phase 3 handlers were reverted individually across the CRUD modules, the
  scoresheet endpoint, the health check and phase promotion. Every one failed the
  static check, which named the offending route.

## Known gaps

- Socket.IO handlers are covered by neither guard. Nine of the eleven do no
  database work at all, and `on_run_status`, the one that does, offloads with
  `anyio.to_thread`. A regression there would not be caught automatically.
- One proposal from the original story is deliberately not implemented: building
  the score broadcast from the committed submission instead of re-reading it.
  That is tracked as its own investigation, since it changes behaviour rather
  than just which thread the work runs on.
