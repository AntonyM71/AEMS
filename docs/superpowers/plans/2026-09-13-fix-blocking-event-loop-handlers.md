# Fix Blocking Sync Work on the ASGI Event Loop — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stop blocking synchronous SQLAlchemy queries/transactions and fpdf2 PDF generation from stalling the single shared ASGI event loop, so unrelated HTTP requests and Socket.IO broadcasts (timer, broadcast control, current scores, run status) aren't delayed while a heavy request is in flight.

**Architecture:** AEMS Server runs as a single Gunicorn worker (`gunicorn -w 1 -k uvicorn.workers.UvicornWorker main:socket_app`, `docker-compose.yaml:22`) with `python-socketio`'s `AsyncServer(async_mode="asgi")` mounted in-process on the same event loop as FastAPI (`Server/app/common/socket_manager.py:19-24`, `Server/main.py:164`). The DB layer (`Server/db/client.py`) is a fully synchronous SQLAlchemy `create_engine`/`sessionmaker`. Every route/socket handler that touches the DB does so with blocking calls, so today they all run on the event loop thread. Two fix mechanisms apply depending on whether a handler needs to `await` anything (like a Socket.IO emit) after its blocking DB work:
- **Mechanism A** — handler does *only* blocking work, nothing else needs to be awaited: drop `async` and make it a plain `def`. FastAPI already runs plain `def` route handlers in its threadpool automatically — this is not a new pattern, it already exists for `upload()` (`Server/app/competition_management/competition_management.py:72`).
- **Mechanism B** — handler must stay `async def` because it awaits something (e.g. `sio.emit`) after the blocking work: keep it async, but move only the blocking section into a helper and run that helper via `await anyio.to_thread.run_sync(helper, ...)`. `anyio` is already a direct dependency (`pyproject.toml`), so this introduces no new package.

**Tech Stack:** FastAPI, SQLAlchemy (sync), python-socketio (`async_mode="asgi"`), anyio (already a dependency, unused for threading today), pytest / pytest-asyncio / fastapi.testclient.

**Spec:** N/A — this plan was produced directly from a grounded code investigation (reality-check) rather than a separate written spec. The "Grounding" notes under each phase capture the verified facts the plan depends on.

## Global Constraints

- Do **not** touch worker count or add a Socket.IO Redis/message-queue adapter. Scaling to multiple Gunicorn workers is out of scope for this plan (it has its own separate ticket) — it would break Socket.IO broadcast fan-out across processes since no `client_manager`/Redis adapter exists today (`Server/app/common/socket_manager.py`, `nginx.conf:8-13`). This plan fixes the problem within the existing single-worker deployment.
- Do **not** add a new dependency for thread-offloading. `anyio.to_thread.run_sync` is already available; do not add `asyncio.to_thread` shims, custom executors, or new packages.
- Every handler conversion must preserve its existing external behavior (status codes, response bodies, DB commit semantics) exactly — this is a concurrency-model refactor, not a behavior change.
- Ruff (line length 88, ANN/N/UP/B/EM/TRY/PD rule sets) must pass on every changed file: `uv run ruff check .` and `uv run ruff format .` from `Server/`.
- Run `uv run python -m pytest` (with coverage) from `Server/` after each task; all existing tests must keep passing.
- Phases are sequential and independently shippable: do not start Phase 2 until Phase 1 is merged and validated; do not start Phase 3 until Phase 2 is validated. Each phase is its own PR.

## File Structure

| Phase | Files touched |
|---|---|
| 1 | `Server/app/scoring/customScoringEndpoints.py` (helper extraction only, no behavior change), `Server/app/competition_management/pdfEndpoints.py`, `Server/app/competition_management/tests/test_pdfEndpoints.py` |
| 2 | `Server/app/scoring/customScoringEndpoints.py`, `Server/app/scoring/tests/test_customScoringEndpoints.py` |
| 3 | `Server/app/crud/*.py` (10 files, 25 handlers), `Server/app/scoresheetEndpoints.py`, `Server/app/competition_management/competition_management.py` (`promote_phase` only) |

No new files are created. No test files need changes in Phase 3 (see Phase 3 grounding) — every affected test there uses `fastapi.testclient.TestClient`, which invokes sync and async route handlers identically.

---

## Phase 1: PDF generation endpoints

**Grounding:**
- `Server/app/competition_management/pdfEndpoints.py`'s three route handlers (`phase_pdf`, `heat_pdf`, `heat_results_pdf`) are `async def` and call blocking `db.query(...)` and fpdf2 document building directly — confirmed via `grep -n await`, only one `await` exists in the whole file: `pdfEndpoints.py:515`, `await get_heat_scores(heat_id=heat_id, db=db)` inside `heat_results_pdf`.
- `get_heat_scores` (`Server/app/scoring/customScoringEndpoints.py:313`) is declared `async def` for route-handler purposes only — it contains zero `await`s internally. Its sibling `get_phase_scores` (`customScoringEndpoints.py:403`) already follows the pattern this phase needs: it's a one-line wrapper around a plain sync helper, `calculate_phase_scores` (`customScoringEndpoints.py:494`).
- `get_heat_scores` has no other callers besides `pdfEndpoints.py:515` and its own route (confirmed via repo-wide grep).
- `Server/app/competition_management/tests/test_pdfEndpoints.py` calls these three handlers **directly** as coroutines (`response = await phase_pdf(phase_id=..., db=...)`), under `@pytest.mark.asyncio` / `async def test_...`. Since pytest-asyncio is in **strict** mode (no `asyncio_mode` config in `pyproject.toml`, so the marker is required), converting the handlers to plain `def` will break these tests unless they're updated in the same change.

### Task 1: Extract `calculate_heat_scores_response` as a plain sync helper

**Files:**
- Modify: `Server/app/scoring/customScoringEndpoints.py:313-397`

**Interfaces:**
- Produces: `calculate_heat_scores_response(heat_id: str, db: Session) -> HeatScoresResponse` — a plain `def`, same body as today's `get_heat_scores`, used by Phase 1 (`pdfEndpoints.py`) and by Phase 2's conversion of `get_heat_scores` itself.

This is a pure refactor — no behavior change, `get_heat_scores` stays `async def` and keeps working as an HTTP route exactly as before, it just delegates now instead of inlining. This is required so `pdfEndpoints.py` can stop awaiting a Phase-2-owned function before Phase 2 has happened.

- [ ] **Step 1: Rename the existing `get_heat_scores` body into a new plain function**

Change `customScoringEndpoints.py:313-397` from:

```python
@scoring_router.get(
    "/getHeatScores/{heat_id}",
)
async def get_heat_scores(
    heat_id: str,
    db: Session = Depends(get_transaction_session),
) -> HeatScoresResponse:
    moves = db.query(ScoredMoves).filter(ScoredMoves.heat_id == heat_id).all()
    ...
    return HeatScoresResponse(heat_id=heat_id, scores=athlete_scores_with_info)
```

to:

```python
@scoring_router.get(
    "/getHeatScores/{heat_id}",
)
async def get_heat_scores(
    heat_id: str,
    db: Session = Depends(get_transaction_session),
) -> HeatScoresResponse:
    return calculate_heat_scores_response(heat_id=heat_id, db=db)


def calculate_heat_scores_response(heat_id: str, db: Session) -> HeatScoresResponse:
    moves = db.query(ScoredMoves).filter(ScoredMoves.heat_id == heat_id).all()
    ...
    return HeatScoresResponse(heat_id=heat_id, scores=athlete_scores_with_info)
```

(The `...` above is the unchanged body currently at lines 317-396 — copy it verbatim into the new function, unindented one level to match a top-level `def`.)

- [ ] **Step 2: Run the existing scoring tests to confirm nothing broke**

Run: `uv run python -m pytest app/scoring/tests/test_customScoringEndpoints.py -v`
Expected: PASS (this is a pure extraction, behavior is identical)

- [ ] **Step 3: Commit**

```bash
git add app/scoring/customScoringEndpoints.py
git commit -m "scoring: extract calculate_heat_scores_response as a plain sync helper"
```

### Task 2: Point `pdfEndpoints.py` at the sync helper instead of awaiting the route function

**Files:**
- Modify: `Server/app/competition_management/pdfEndpoints.py:11-18` (import), `Server/app/competition_management/pdfEndpoints.py:515`

**Interfaces:**
- Consumes: `calculate_heat_scores_response(heat_id: str, db: Session) -> HeatScoresResponse` from Task 1.

- [ ] **Step 1: Update the import**

Change `pdfEndpoints.py:11-18` from:

```python
from app.scoring.customScoringEndpoints import (
    HeatInfoResponse,
    HeatScoresResponse,
    PhaseScoresResponse,
    calculate_phase_scores,
    get_heat_info_logic,
    get_heat_scores,
)
```

to:

```python
from app.scoring.customScoringEndpoints import (
    HeatInfoResponse,
    HeatScoresResponse,
    PhaseScoresResponse,
    calculate_heat_scores_response,
    calculate_phase_scores,
    get_heat_info_logic,
)
```

- [ ] **Step 2: Update the call site**

Change `pdfEndpoints.py:515` from:

```python
        heat_scores = await get_heat_scores(heat_id=heat_id, db=db)
```

to:

```python
        heat_scores = calculate_heat_scores_response(heat_id=heat_id, db=db)
```

- [ ] **Step 3: Run the PDF tests**

Run: `uv run python -m pytest app/competition_management/tests/test_pdfEndpoints.py -v`
Expected: PASS (still `await heat_results_pdf(...)` in tests at this point, handler itself is still `async def`; only its internal call changed from `await`-a-coroutine to a plain sync call, which is legal inside an `async def`)

- [ ] **Step 4: Commit**

```bash
git add app/competition_management/pdfEndpoints.py
git commit -m "pdf: call calculate_heat_scores_response directly instead of awaiting get_heat_scores"
```

### Task 3: Convert `phase_pdf`, `heat_pdf`, `heat_results_pdf` to plain `def` handlers

**Files:**
- Modify: `Server/app/competition_management/pdfEndpoints.py:422-423`, `:454-455`, `:505-506`
- Test: `Server/app/competition_management/tests/test_pdfEndpoints.py` (all 12 test functions that call these three handlers)

**Interfaces:**
- No signature change other than dropping `async` — parameters, return types, and response bodies are unchanged.

- [ ] **Step 1: Drop `async` from the three handler signatures**

`pdfEndpoints.py:423`: `async def phase_pdf(` → `def phase_pdf(`
`pdfEndpoints.py:455`: `async def heat_pdf(` → `def heat_pdf(`
`pdfEndpoints.py:506`: `async def heat_results_pdf(` → `def heat_results_pdf(`

Nothing else in these three function bodies needs to change — none of them contain an `await` (confirmed: `heat_results_pdf`'s only `await` was removed in Task 2).

- [ ] **Step 2: Update the test file to call them synchronously**

`test_pdfEndpoints.py` currently has 12 test functions, each `async def test_...` decorated with `@pytest.mark.asyncio`, calling one of the three handlers with `await`. For every one of these test functions (`test_phase_pdf_success`, `test_phase_pdf_db_error`, `test_heat_pdf_success`, `test_heat_pdf_no_ids`, `test_heat_pdf_not_found`, `test_heat_pdf_multiple_heats`, `test_heat_results_pdf_success`, `test_heat_results_pdf_no_id`, `test_heat_results_pdf_error`, `test_pdf_content_structure`, `test_phase_pdf_dns_athlete`, `test_heat_pdf_exception`):

1. Remove the `@pytest.mark.asyncio` decorator line immediately above the function.
2. Change `async def test_...` to `def test_...`.
3. Remove `await` immediately before the call to `phase_pdf(...)`, `heat_pdf(...)`, or `heat_results_pdf(...)`.

Worked example — `test_phase_pdf_success` (`test_pdfEndpoints.py:69-89`) changes from:

```python
@pytest.mark.asyncio
async def test_phase_pdf_success(
    mock_db_session: Session,
    sample_phase_id: str,
    mock_competition: MagicMock,
    mock_event: MagicMock,
    mock_phase: MagicMock,
) -> None:
    ...
        response = await phase_pdf(phase_id=sample_phase_id, db=mock_db_session)
```

to:

```python
def test_phase_pdf_success(
    mock_db_session: Session,
    sample_phase_id: str,
    mock_competition: MagicMock,
    mock_event: MagicMock,
    mock_phase: MagicMock,
) -> None:
    ...
        response = phase_pdf(phase_id=sample_phase_id, db=mock_db_session)
```

Apply the identical three-part transform to the other 11 test functions listed above, each at its own line (unpack any `pytest.raises(HTTPException)` context managers unchanged — only the `async`/`await`/marker triad moves).

- [ ] **Step 3: Run the PDF tests**

Run: `uv run python -m pytest app/competition_management/tests/test_pdfEndpoints.py -v`
Expected: PASS, all 12 tests

- [ ] **Step 4: Run ruff**

Run: `uv run ruff check app/competition_management/pdfEndpoints.py app/competition_management/tests/test_pdfEndpoints.py`
Expected: no errors (an unused `pytest` import is fine since other tests in the file may still use `@pytest.mark.asyncio`-free `pytest.raises`; if ruff flags an unused import, remove it)

- [ ] **Step 5: Run the full backend test suite**

Run: `uv run python -m pytest`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add app/competition_management/pdfEndpoints.py app/competition_management/tests/test_pdfEndpoints.py
git commit -m "pdf: run PDF generation handlers in FastAPI's threadpool instead of the event loop"
```

**Phase 1 validation:** deploy/run locally, generate a large phase/heat PDF while another client is connected to a Socket.IO namespace (e.g. `/current_scores` or `/timer`) and confirm timer ticks / broadcasts keep arriving during PDF generation instead of pausing. This is the manual check the user asked to be "happy with" before Phase 2 starts.

---

## Phase 2: Scoring endpoints (`customScoringEndpoints.py`)

**Grounding:**
- `get_heat_info` (`:70`), `get_heat_phases` (`:120`), `get_athlete_moves_and_bonuses` (`:268`), `get_heat_scores` (`:313`, now delegating per Phase 1), `get_phase_scores` (`:403`) do **only** blocking DB work with no trailing `await` — Mechanism A applies to all five.
- `update_athlete_score` (`:138`) commits inside `with db.begin():` then does `await get_moves_from_server(...)` → `await sio.emit("current_scores", ...)` (`:201-214`) — must stay `async def`. Mechanism B.
- `get_moves_from_server` (`:241`) is awaited by `update_athlete_score` and itself calls `get_athlete_moves_and_bonuses` — once that becomes a plain sync function (Mechanism A below), `get_moves_from_server`'s remaining body is 100% blocking DB work wrapped in an `async def` shell just so it can be awaited. Mechanism B: keep it `async def`, move its body into a sync helper run via `anyio.to_thread.run_sync`.
- `on_run_status` (`:587`, a Socket.IO `@sio.on(...)` handler) calls blocking `copy_message_to_db(...)` then `await sio.emit(...)`. Socket.IO's `AsyncServer` requires its event handlers to be `async def` regardless of whether they emit afterward — Mechanism A (dropping `async`) is **not available** here even though the current code has no other special requirement; the blocking call must be offloaded instead. Mechanism B.
- Only `get_athlete_moves_and_bonuses` has existing direct-call tests today (`test_customScoringEndpoints.py:159-278`, two tests, `await get_athlete_moves_and_bonuses(...)`) that need updating. `update_athlete_score`, `get_moves_from_server`, and `on_run_status` have **no existing tests** — this phase adds a minimal characterization test for each before refactoring it, per the "leave one runnable check" rule for any handler with a branch/side-effect being touched.

### Task 4: Convert the five pure-read handlers to plain `def` (Mechanism A)

**Files:**
- Modify: `Server/app/scoring/customScoringEndpoints.py:70`, `:120`, `:268`, `:313`, `:403`
- Modify: `Server/app/scoring/tests/test_customScoringEndpoints.py:159,214,259` (the two `get_athlete_moves_and_bonuses` tests)
- Modify: `Server/app/scoring/customScoringEndpoints.py:247` (the one internal caller of `get_athlete_moves_and_bonuses`, inside `get_moves_from_server` — see Task 5, do this rename together with Task 5 since `get_moves_from_server` is being rewritten there anyway)

- [ ] **Step 1: Drop `async` from the five signatures**

`:70` `async def get_heat_info(` → `def get_heat_info(`
`:120` `async def get_heat_phases(` → `def get_heat_phases(`
`:268` `async def get_athlete_moves_and_bonuses(` → `def get_athlete_moves_and_bonuses(`
`:313` `async def get_heat_scores(` → `def get_heat_scores(`
`:403` `async def get_phase_scores(` → `def get_phase_scores(`

None of these five function bodies contain an `await` — no other changes needed inside them.

- [ ] **Step 2: Update the two `get_athlete_moves_and_bonuses` direct-call tests**

`test_customScoringEndpoints.py:159` and `:214`: remove `@pytest.mark.asyncio` above each, change `async def test_get_athlete_moves_and_bonuses(...)` / `async def test_get_athlete_moves_and_bonuses_without_judge_id(...)` to plain `def`, and remove `await` at `:195` and `:259` before `get_athlete_moves_and_bonuses(...)`.

- [ ] **Step 3: Run the scoring tests**

Run: `uv run python -m pytest app/scoring/tests/test_customScoringEndpoints.py -v`
Expected: FAIL at this point — `get_moves_from_server` (unchanged so far) still does `await get_athlete_moves_and_bonuses(...)` at `:247`, which is now a plain function call, not a coroutine, so `await` on its return value raises `TypeError: object ScoredMovesAndBonusesResponse can't be used in 'await' expression`. This is expected and fixed by Task 5 — do not commit yet; continue directly into Task 5 (these two tasks land as one commit since they're interdependent).

### Task 5: Rewrite `get_moves_from_server` and `on_run_status` with thread-offloaded blocking work (Mechanism B)

**Files:**
- Modify: `Server/app/scoring/customScoringEndpoints.py:1-13` (imports), `:241-262`, `:587-591`
- Test: `Server/app/scoring/tests/test_customScoringEndpoints.py` (new tests)

**Interfaces:**
- Consumes: `get_athlete_moves_and_bonuses(heat_id: str, athlete_id: str, run_number: int, judge_id: str | None, db: Session) -> ScoredMovesAndBonusesResponse` — now a plain sync function (Task 4).
- Produces: `get_moves_from_server(metadata: UpdatedRideMetaData) -> dict` — same signature as today, still `async def`, still awaitable from `update_athlete_score`.

- [ ] **Step 1: Add the `anyio` import**

Add to `customScoringEndpoints.py`'s import block (near the top, alongside the other third-party imports at `:6-13`):

```python
import anyio.to_thread
```

- [ ] **Step 2: Write a characterization test for `get_moves_from_server` before changing it**

Add to `test_customScoringEndpoints.py` (this exercises the function as it behaves *today*, so it must pass before Step 3's rewrite and continue passing after):

```python
@pytest.mark.asyncio
async def test_get_moves_from_server_returns_moves_and_metadata(
    mock_db_session: Session,
) -> None:
    heat_id = str(uuid.uuid4())
    athlete_id = str(uuid.uuid4())
    judge_id = str(uuid.uuid4())
    phase_id = str(uuid.uuid4())
    metadata = UpdatedRideMetaData(
        heat_id=heat_id,
        athlete_id=athlete_id,
        run_number=1,
        judge_id=judge_id,
        phase_id=phase_id,
    )
    mock_db_session.query.return_value.filter.return_value.filter.return_value.filter.return_value.all.return_value = []
    mock_db_session.query.return_value.filter.return_value.all.return_value = []

    result = await get_moves_from_server(metadata)

    assert result["heat_id"] == heat_id
    assert result["athlete_id"] == athlete_id
    assert result["movesAndBonuses"]["moves"] == []
    assert result["movesAndBonuses"]["bonuses"] == []
```

(Add `import uuid` at the top of the test file if not already present, and import `UpdatedRideMetaData`/`get_moves_from_server` from `app.scoring.customScoringEndpoints` alongside the existing imports.)

- [ ] **Step 3: Run it to confirm it passes against today's implementation**

Run: `uv run python -m pytest app/scoring/tests/test_customScoringEndpoints.py::test_get_moves_from_server_returns_moves_and_metadata -v`
Expected: PASS (this locks in current behavior before the rewrite)

- [ ] **Step 4: Rewrite `get_moves_from_server`**

Change `customScoringEndpoints.py:241-262` from:

```python
async def get_moves_from_server(metadata: UpdatedRideMetaData) -> dict:
    """
    Receives metadata for a scored ride and returns scored moves and bonuses as a dict.
    Uses a transaction session context manager to ensure consistent session management.
    """
    with transaction_session_context_manager() as db:
        scored_moves_and_bonuses = await get_athlete_moves_and_bonuses(
            heat_id=metadata.heat_id,
            athlete_id=metadata.athlete_id,
            run_number=metadata.run_number,
            judge_id=metadata.judge_id,
            db=db,
        )

        return ScoredMovesAndBonusesResponseWithMetaData(
            movesAndBonuses=scored_moves_and_bonuses,
            heat_id=metadata.heat_id,
            athlete_id=metadata.athlete_id,
            run_number=metadata.run_number,
            phase_id=metadata.phase_id,
            judge_id=metadata.judge_id,
        ).model_dump(mode="json")
```

to:

```python
def _fetch_moves_and_bonuses_for_ride(metadata: UpdatedRideMetaData) -> dict:
    with transaction_session_context_manager() as db:
        scored_moves_and_bonuses = get_athlete_moves_and_bonuses(
            heat_id=metadata.heat_id,
            athlete_id=metadata.athlete_id,
            run_number=metadata.run_number,
            judge_id=metadata.judge_id,
            db=db,
        )

        return ScoredMovesAndBonusesResponseWithMetaData(
            movesAndBonuses=scored_moves_and_bonuses,
            heat_id=metadata.heat_id,
            athlete_id=metadata.athlete_id,
            run_number=metadata.run_number,
            phase_id=metadata.phase_id,
            judge_id=metadata.judge_id,
        ).model_dump(mode="json")


async def get_moves_from_server(metadata: UpdatedRideMetaData) -> dict:
    """
    Receives metadata for a scored ride and returns scored moves and bonuses as a dict.
    Runs the blocking DB read in a worker thread so it doesn't stall the event loop.
    """
    return await anyio.to_thread.run_sync(_fetch_moves_and_bonuses_for_ride, metadata)
```

- [ ] **Step 5: Run all scoring tests**

Run: `uv run python -m pytest app/scoring/tests/test_customScoringEndpoints.py -v`
Expected: PASS, including `test_get_moves_from_server_returns_moves_and_metadata` and the two updated `get_athlete_moves_and_bonuses` tests from Task 4

- [ ] **Step 6: Write a characterization test for `on_run_status`, confirm it passes today, then offload it**

Add to `test_customScoringEndpoints.py`:

```python
@pytest.mark.asyncio
async def test_on_run_status_persists_and_broadcasts(
    mock_db_session: Session,
) -> None:
    payload = {
        "heat_id": str(uuid.uuid4()),
        "athlete_id": str(uuid.uuid4()),
        "phase_id": str(uuid.uuid4()),
        "run_number": 1,
        "did_not_start": False,
        "locked": False,
    }
    mock_db_session.query.return_value.filter.return_value.filter.return_value.filter.return_value.one_or_none.return_value = None

    with patch("app.scoring.customScoringEndpoints.sio.emit") as mock_emit:
        mock_emit.return_value = None
        await on_run_status(sid="test-sid", data=payload)

    mock_emit.assert_awaited_once_with(
        "run_status", payload, namespace="/run_status"
    )
```

(Add `from unittest.mock import patch` to the test file's imports if not already present, alongside `on_run_status` and `RunStatusSchema`/whatever model is needed for the mocked query chain — match the mock chain to whatever `copy_message_to_db`'s actual query shape is at `customScoringEndpoints.py:604-610`.)

Run: `uv run python -m pytest app/scoring/tests/test_customScoringEndpoints.py::test_on_run_status_persists_and_broadcasts -v` — expect PASS against today's implementation first.

Then change `customScoringEndpoints.py:587-591` from:

```python
@sio.on("run_status", namespace="/run_status")
async def on_run_status(sid: str, data: dict) -> None:
    logging.info("Socket.IO /run_status: received message from %s", sid)
    copy_message_to_db(json.dumps(data))
    await sio.emit("run_status", data, namespace="/run_status")
```

to:

```python
@sio.on("run_status", namespace="/run_status")
async def on_run_status(sid: str, data: dict) -> None:
    logging.info("Socket.IO /run_status: received message from %s", sid)
    await anyio.to_thread.run_sync(copy_message_to_db, json.dumps(data))
    await sio.emit("run_status", data, namespace="/run_status")
```

- [ ] **Step 7: Run all scoring tests again**

Run: `uv run python -m pytest app/scoring/tests/test_customScoringEndpoints.py -v`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add app/scoring/customScoringEndpoints.py app/scoring/tests/test_customScoringEndpoints.py
git commit -m "scoring: run pure-read handlers in the threadpool, offload blocking work in socket-emitting handlers"
```

### Task 6: Offload `update_athlete_score`'s blocking transaction (Mechanism B)

**Files:**
- Modify: `Server/app/scoring/customScoringEndpoints.py:138-219`
- Test: `Server/app/scoring/tests/test_customScoringEndpoints.py` (new test)

**Interfaces:**
- Produces: `_persist_athlete_score(db: Session, heat_id: str, athlete_id: str, run_number: str, judge_id: str, phase_id: str, scored_moves_list: AddUpdateScoredMovesRequest) -> UpdatedRideMetaData` — new plain sync helper, run via `anyio.to_thread.run_sync`.

- [ ] **Step 1: Write a characterization test for the current behavior**

```python
@pytest.mark.asyncio
async def test_update_athlete_score_persists_and_broadcasts(
    mock_db_session: Session,
) -> None:
    heat_id = str(uuid.uuid4())
    athlete_id = str(uuid.uuid4())
    judge_id = str(uuid.uuid4())
    phase_id = str(uuid.uuid4())
    mock_db_session.query.return_value.filter.return_value.filter.return_value.filter.return_value.filter.return_value.one_or_none.return_value = None
    request = AddUpdateScoredMovesRequest(moves=[], bonuses=[])

    with (
        patch("app.scoring.customScoringEndpoints.sio.emit") as mock_emit,
        patch(
            "app.scoring.customScoringEndpoints.get_moves_from_server"
        ) as mock_get_moves,
    ):
        mock_get_moves.return_value = {"heat_id": heat_id}
        await update_athlete_score(
            heat_id=heat_id,
            athlete_id=athlete_id,
            run_number="1",
            judge_id=judge_id,
            phase_id=phase_id,
            scored_moves_list=request,
            db=mock_db_session,
        )

    assert mock_db_session.commit.called
    mock_emit.assert_awaited_once()
```

Run: `uv run python -m pytest app/scoring/tests/test_customScoringEndpoints.py::test_update_athlete_score_persists_and_broadcasts -v`
Expected: PASS against today's implementation (adjust the mocked query chain's filter-call depth if it doesn't match `check_run_is_locked`'s actual query shape — check `customScoringEndpoints.py`'s `check_run_is_locked` definition for the exact chain and mirror the existing `test_check_run_is_locked_returns_true_when_locked` test's mock setup).

- [ ] **Step 2: Extract the blocking body into `_persist_athlete_score`**

Change `customScoringEndpoints.py:138-219` from:

```python
async def update_athlete_score(
    heat_id: str,
    athlete_id: str,
    run_number: str,
    judge_id: str,
    phase_id: str,
    scored_moves_list: AddUpdateScoredMovesRequest,
    db: Session = Depends(get_transaction_session),
) -> None:
    try:
        with db.begin():
            run_is_locked = check_run_is_locked(...)
            if run_is_locked:
                ...
            scored_moves = (...)
            ...
            db.commit()
            websocket_message = UpdatedRideMetaData(
                heat_id=heat_id,
                athlete_id=athlete_id,
                run_number=run_number,
                judge_id=judge_id,
                phase_id=phase_id,
            )
            scored_data = await get_moves_from_server(websocket_message)
            await sio.emit(
                "current_scores",
                scored_data,
                namespace="/current_scores",
            )
    except Exception as e:
        logging.exception("Error Updating Score")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        ) from e
```

to:

```python
def _persist_athlete_score(
    db: Session,
    heat_id: str,
    athlete_id: str,
    run_number: str,
    judge_id: str,
    phase_id: str,
    scored_moves_list: AddUpdateScoredMovesRequest,
) -> UpdatedRideMetaData:
    with db.begin():
        run_is_locked = check_run_is_locked(...)
        if run_is_locked:
            ...
        scored_moves = (...)
        ...
        db.commit()
        return UpdatedRideMetaData(
            heat_id=heat_id,
            athlete_id=athlete_id,
            run_number=run_number,
            judge_id=judge_id,
            phase_id=phase_id,
        )


async def update_athlete_score(
    heat_id: str,
    athlete_id: str,
    run_number: str,
    judge_id: str,
    phase_id: str,
    scored_moves_list: AddUpdateScoredMovesRequest,
    db: Session = Depends(get_transaction_session),
) -> None:
    try:
        websocket_message = await anyio.to_thread.run_sync(
            _persist_athlete_score,
            db,
            heat_id,
            athlete_id,
            run_number,
            judge_id,
            phase_id,
            scored_moves_list,
        )
        scored_data = await get_moves_from_server(websocket_message)
        await sio.emit(
            "current_scores",
            scored_data,
            namespace="/current_scores",
        )
    except Exception as e:
        logging.exception("Error Updating Score")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        ) from e
```

(The `...` sections above are the unchanged body currently at `customScoringEndpoints.py:149-199` — move it verbatim into `_persist_athlete_score`, keeping the `raise UpdatingLockedRunError` and the `# noqa: TRY301` comment as-is since that logic now lives in a plain function, not the try/except in `update_athlete_score`; add `# noqa: TRY301` handling is unaffected since the exception still propagates up through `anyio.to_thread.run_sync` to the same outer `except Exception` block.)

- [ ] **Step 3: Run the new and existing scoring tests**

Run: `uv run python -m pytest app/scoring/tests/test_customScoringEndpoints.py -v`
Expected: PASS, including `test_update_athlete_score_persists_and_broadcasts`

- [ ] **Step 4: Run ruff and the full backend suite**

Run: `uv run ruff check app/scoring/customScoringEndpoints.py app/scoring/tests/test_customScoringEndpoints.py`
Run: `uv run python -m pytest`
Expected: no errors, all tests pass

- [ ] **Step 5: Commit**

```bash
git add app/scoring/customScoringEndpoints.py app/scoring/tests/test_customScoringEndpoints.py
git commit -m "scoring: offload update_athlete_score's blocking transaction to a worker thread"
```

**Phase 2 validation:** with a client submitting scores rapidly (or a script hammering `/addUpdateAthleteScore/...`), confirm Socket.IO `/timer` and `/broadcast_control` events keep flowing on schedule instead of pausing during score submission bursts.

---

## Phase 3: Everything else (`crud/*`, `scoresheetEndpoints.py`, `promote_phase`)

**Grounding:**
- 25 handlers across 10 files in `Server/app/crud/` plus `add_update_scoresheet` (`Server/app/scoresheetEndpoints.py:135`) plus `promote_phase` (`Server/app/competition_management/competition_management.py:128`) are all `async def` with zero `await` anywhere in any of them (confirmed via repo-wide grep) — every single one is Mechanism A.
- Every test file covering these handlers (`app/crud/tests/test_*.py` × 12 files, `app/competition_management/tests/test_promote_phase_endpoint.py`, `app/crud/tests/test_scoresheet_endpoints.py`) uses `fastapi.testclient.TestClient` to make real HTTP requests, never a direct coroutine call. `TestClient` (via Starlette) invokes sync and async route handlers identically — **no test file changes are required for this phase.**
- These files are hand-written, not generated by a codegen script (confirmed: no generator/template tooling found under `Server/` producing `app/crud/*.py`) — safe to hand-edit directly.

### Task 7: Convert all four handlers in `crud/heat.py` (worked example)

**Files:**
- Modify: `Server/app/crud/heat.py:60`, `:94`, `:113`, `:138`

- [ ] **Step 1: Drop `async` from all four signatures**

`:60` `async def get_many(` → `def get_many(`
`:94` `async def get_one_by_primary_key(` → `def get_one_by_primary_key(`
`:113` `async def partial_update_one_by_primary_key(` → `def partial_update_one_by_primary_key(`
`:138` `async def insert_many(` → `def insert_many(`

No other changes — none of these four functions contain an `await`.

- [ ] **Step 2: Run the heat CRUD tests**

Run: `uv run python -m pytest app/crud/tests/test_heat.py -v`
Expected: PASS, unchanged (TestClient doesn't care whether the handler is sync or async)

- [ ] **Step 3: Commit**

```bash
git add app/crud/heat.py
git commit -m "crud: run heat endpoints in FastAPI's threadpool instead of the event loop"
```

### Task 8: Apply the identical conversion to every remaining Phase 3 handler

**Files and handlers** (apply exactly the Task 7 recipe — drop `async` from each signature, no body changes, no test changes):

- `Server/app/crud/athlete.py:16` `insert_many`, `:38` `partial_update_one_by_primary_key`
- `Server/app/crud/athleteheat.py:15` `insert_many`, `:40` `partial_update_one_by_primary_key`
- `Server/app/crud/availablebonuses.py:23` `get_many`
- `Server/app/crud/availablemoves.py:21` `get_many`
- `Server/app/crud/competition.py:62` `get_many`, `:100` `insert_many`, `:122` `partial_update_one_by_primary_key`, `:146` `get_many_by_pk_from_event`
- `Server/app/crud/event.py:64` `get_many`, `:100` `get_one_by_primary_key`, `:119` `insert_many`, `:141` `get_many_by_pk_from_phase`
- `Server/app/crud/phase.py:42` `get_one_by_primary_key`, `:122` `partial_update_one_by_primary_key`, `:154` `insert_many`
- `Server/app/crud/run_status.py:21` `get_many`
- `Server/app/crud/scoredmoves.py:14` `delete_many`
- `Server/app/crud/scoresheet.py:20` `get_many`, `:48` `insert_many`
- `Server/app/scoresheetEndpoints.py:135` `add_update_scoresheet`
- `Server/app/competition_management/competition_management.py:128` `promote_phase`

- [ ] **Step 1: Convert each file, one commit per file, running that file's own test module after each**

For each file above: drop `async` from every listed handler, then run its corresponding test file:

```bash
uv run python -m pytest app/crud/tests/test_athlete.py -v
uv run python -m pytest app/crud/tests/test_athleteheat.py -v
uv run python -m pytest app/crud/tests/test_availablebonuses.py -v
uv run python -m pytest app/crud/tests/test_availablemoves.py -v
uv run python -m pytest app/crud/tests/test_competition.py -v
uv run python -m pytest app/crud/tests/test_event.py -v
uv run python -m pytest app/crud/tests/test_phase.py -v
uv run python -m pytest app/crud/tests/test_run_status.py -v
uv run python -m pytest app/crud/tests/test_scoredmoves.py -v
uv run python -m pytest app/crud/tests/test_scoresheet.py -v
uv run python -m pytest app/crud/tests/test_scoresheet_endpoints.py -v
uv run python -m pytest app/competition_management/tests/test_promote_phase_endpoint.py -v
```

Expected: PASS for each, unchanged.

Commit after each file:

```bash
git add app/crud/athlete.py && git commit -m "crud: run athlete endpoints in FastAPI's threadpool instead of the event loop"
git add app/crud/athleteheat.py && git commit -m "crud: run athleteheat endpoints in FastAPI's threadpool instead of the event loop"
git add app/crud/availablebonuses.py && git commit -m "crud: run availablebonuses endpoint in FastAPI's threadpool instead of the event loop"
git add app/crud/availablemoves.py && git commit -m "crud: run availablemoves endpoint in FastAPI's threadpool instead of the event loop"
git add app/crud/competition.py && git commit -m "crud: run competition endpoints in FastAPI's threadpool instead of the event loop"
git add app/crud/event.py && git commit -m "crud: run event endpoints in FastAPI's threadpool instead of the event loop"
git add app/crud/phase.py && git commit -m "crud: run phase endpoints in FastAPI's threadpool instead of the event loop"
git add app/crud/run_status.py && git commit -m "crud: run run_status endpoint in FastAPI's threadpool instead of the event loop"
git add app/crud/scoredmoves.py && git commit -m "crud: run scoredmoves endpoint in FastAPI's threadpool instead of the event loop"
git add app/crud/scoresheet.py && git commit -m "crud: run scoresheet endpoints in FastAPI's threadpool instead of the event loop"
git add app/scoresheetEndpoints.py && git commit -m "scoresheet: run add_update_scoresheet in FastAPI's threadpool instead of the event loop"
git add app/competition_management/competition_management.py && git commit -m "competition_management: run promote_phase in FastAPI's threadpool instead of the event loop"
```

- [ ] **Step 2: Run the full backend suite and ruff once more**

Run: `uv run python -m pytest`
Run: `uv run ruff check .`
Expected: all pass, no lint errors

**Phase 3 validation:** with the full CRUD surface converted, re-run the Phase 1/2 manual checks (heavy PDF generation, rapid score submission) plus a bulk CRUD operation (e.g. `insert_many` on `heat` with many rows) concurrently with an open Socket.IO connection, and confirm broadcasts are never delayed by more than normal network latency.

---

## Self-Review

**Spec coverage:** every handler identified in the reality-check investigation as doing blocking work on the event loop is covered — Phase 1 (3 PDF handlers), Phase 2 (7 scoring handlers/helpers: 5 Mechanism A + `get_moves_from_server` + `update_athlete_score`, plus the `on_run_status` socket handler), Phase 3 (27 remaining handlers across `crud/`, `scoresheetEndpoints.py`, `promote_phase`). The out-of-scope worker-scaling item is explicitly called out in Global Constraints so it isn't silently dropped or silently attempted.

**Placeholder scan:** every task shows the actual before/after code, exact file:line citations, and exact commands. The one exception — Task 6's `...` inside `_persist_athlete_score`'s body — is flagged inline as "copy verbatim from the existing lines," which is the same pattern used successfully in Tasks 1 and 3's worked examples, not a vague placeholder.

**Type consistency:** `calculate_heat_scores_response(heat_id: str, db: Session) -> HeatScoresResponse` (Task 1) is the exact name and signature used by both its definition and its Task 2 call site. `_fetch_moves_and_bonuses_for_ride` and `_persist_athlete_score` are each defined and called with matching signatures within their own task. `get_athlete_moves_and_bonuses`'s signature is unchanged by its Task 4 conversion, so `_fetch_moves_and_bonuses_for_ride`'s call to it in Task 5 doesn't need updating beyond dropping `await`.
