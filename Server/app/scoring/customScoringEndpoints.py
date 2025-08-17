import json
import logging
from math import inf
from typing import Annotated, Optional
from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    WebSocket,
    WebSocketDisconnect,
    status,
)
from fastapi.concurrency import run_until_first_complete
from fastapi.params import Query
from fastapi.responses import ORJSONResponse
from pydantic import BaseModel, parse_obj_as
from sqlalchemy.orm import Session

from app.common.websocket_handler import (
    publisher,
    ws_receiver,
    ws_sender,
)
from app.scoresheetEndpoints import (
    PydanticAvailableBonuses,
    PydanticAvailableMoves,
)
from app.scoring.scoring_logic import (
    AddUpdateScoredMovesRequest,
    AthleteMovesWithJudgeInfo,
    AthleteScores,
    AthleteScoresWithAthleteInfo,
    PydanticRunStatus,
    PydanticScoredBonusesResponse,
    PydanticScoredMovesResponse,
    calculate_heat_scores,
    calculate_rank,
    check_athlete_started_at_least_one_ride,
    organise_moves_by_athlete_run_judge,
)
from db.client import get_transaction_session, transaction_session_context_manager
from db.models import (
    Athlete,
    AthleteHeat,
    AvailableBonuses,
    AvailableMoves,
    Phase,
    RunStatus,
    ScoredBonuses,
    ScoredMoves,
)

scoring_router = APIRouter(tags=["scoring"])


class HeatInfoResponse(BaseModel):
    athlete_heat_id: UUID
    heat_id: UUID
    athlete_id: UUID
    phase_id: UUID
    number_of_runs: int
    number_of_runs_for_score: int
    scoresheet: UUID
    first_name: str
    last_name: str
    affiliation: Optional[str]
    bib: str
    last_phase_rank: Optional[int]
    event_name: str

    class Config:
        orm_mode = True


@scoring_router.get(
    "/getHeatInfo/{heat_id}",
    response_class=ORJSONResponse,
    response_model=list[HeatInfoResponse],
)
async def get_heat_info(
    heat_id: str,
    db: Session = Depends(get_transaction_session),
) -> list[HeatInfoResponse]:
    return get_heat_info_logic(heat_id=heat_id, db=db)


def get_heat_info_logic(heat_id: str, db: Session) -> list[HeatInfoResponse]:
    heat_info = db.query(AthleteHeat).where(AthleteHeat.heat_id == heat_id).all()

    heat_info_response = [
        HeatInfoResponse(
            athlete_heat_id=h.__dict__["id"],
            heat_id=h.__dict__["heat_id"],
            athlete_id=h.__dict__["athlete_id"],
            phase_id=h.__dict__["phase_id"],
            number_of_runs_for_score=h.phases.number_of_runs_for_score,
            number_of_runs=h.phases.number_of_runs,
            scoresheet=h.phases.scoresheet,
            first_name=h.athletes.first_name,
            last_name=h.athletes.last_name,
            affiliation=h.athletes.affiliation,
            bib=h.athletes.bib,
            last_phase_rank=h.last_phase_rank,
            event_name=h.phases.event.name,
        )
        for h in heat_info
    ]
    heat_info_response.sort(key=lambda x: int(x.bib))
    heat_info_response.sort(
        key=lambda x: -x.last_phase_rank if x.last_phase_rank else -inf
    )  # minus sign to order paddlers in ascending order, i.e. highest scoring paddler last
    return heat_info_response


class PhaseResponse(BaseModel):
    id: UUID
    event_id: UUID
    name: str
    number_of_runs: int
    number_of_runs_for_score: int
    number_of_judges: int
    scoresheet: UUID

    class Config:
        orm_mode = True


@scoring_router.get(
    "/getHeatInfo/{heat_id}/phase",
    response_class=ORJSONResponse,
    response_model=list[PhaseResponse],
)
async def get_heat_phases(
    heat_id: str,
    db: Session = Depends(get_transaction_session),
) -> list[PhaseResponse]:
    heat_info = db.query(AthleteHeat).where(AthleteHeat.heat_id == heat_id).all()

    phases = set([h.__dict__["phase_id"] for h in heat_info])
    phase_info = db.query(Phase).where(Phase.id.in_(list(phases))).all()
    return parse_obj_as(list[PhaseResponse], phase_info)


class UpdatingLockedRunError(Exception):
    pass


@scoring_router.post(
    "/addUpdateAthleteScore/{heat_id}/{athlete_id}/{run_number}/{judge_id}"
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
        with db.begin():
            run_is_locked = check_run_is_locked(
                db=db,
                heat_id=heat_id,
                athlete_id=athlete_id,
                run_number=run_number,
                phase_id=phase_id,
            )
            if run_is_locked:
                msg = "Score Update not processed as the run is locked"
                raise UpdatingLockedRunError(  # noqa: TRY301
                    msg
                )
            scored_moves = (
                db.query(ScoredMoves.id)
                .filter(ScoredMoves.heat_id == heat_id)
                .filter(ScoredMoves.athlete_id == athlete_id)
                .filter(ScoredMoves.run_number == run_number)
                .filter(ScoredMoves.judge_id == judge_id)
            )

            delete_scored_bonuses_statement = ScoredBonuses.__table__.delete().where(
                ScoredBonuses.move_id.in_(scored_moves)
            )
            db.execute(delete_scored_bonuses_statement)
            delete_scored_moves_statement = ScoredMoves.__table__.delete().where(
                ScoredMoves.id.in_(scored_moves)
            )
            db.execute(delete_scored_moves_statement)

            db.bulk_save_objects(
                [
                    ScoredMoves(
                        **move.dict(),
                        judge_id=judge_id,
                        heat_id=heat_id,
                        phase_id=phase_id,
                        athlete_id=athlete_id,
                        run_number=run_number,
                    )
                    for move in scored_moves_list.moves
                ]
            )
            db.bulk_save_objects(
                [
                    ScoredBonuses(
                        **bonus.dict(),
                        judge_id=judge_id,
                    )
                    for bonus in scored_moves_list.bonuses
                ]
            )

            db.commit()
            websocket_message = UpdatedRideMetaData(
                heat_id=heat_id,
                athlete_id=athlete_id,
                run_number=run_number,
                judge_id=judge_id,
                phase_id=phase_id,
            )
            await publisher(message=websocket_message.json(), channel="current_scores")
    except Exception as e:
        logging.exception("Error Updating Score")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        ) from e


class ScoredMovesAndBonusesResponse(BaseModel):
    moves: list[PydanticScoredMovesResponse]
    bonuses: list[PydanticScoredBonusesResponse]

    class Config:
        orm_mode = True


class UpdatedRideMetaData(BaseModel):
    heat_id: str
    athlete_id: str
    run_number: int
    judge_id: int
    phase_id: str


class ScoredMovesAndBonusesResponseWithMetaData(UpdatedRideMetaData):
    movesAndBonuses: ScoredMovesAndBonusesResponse  # noqa: N815


async def get_moves_from_server(message: str) -> str:
    """
    Receives a message, parses metadata, and returns scored moves and bonuses.
    Uses a transaction session context manager to ensure consistent session management.
    """
    metadata = UpdatedRideMetaData(**json.loads(message))
    with transaction_session_context_manager() as db:
        scored_moves_and_bonuses = await get_athlete_moves_and_bonuses(
            heat_id=metadata.heat_id,
            athlete_id=metadata.athlete_id,
            run_number=str(metadata.run_number),
            judge_id=str(metadata.judge_id),
            db=db,
        )

        return ScoredMovesAndBonusesResponseWithMetaData(
            movesAndBonuses=scored_moves_and_bonuses,
            heat_id=metadata.heat_id,
            athlete_id=metadata.athlete_id,
            run_number=metadata.run_number,
            phase_id=metadata.phase_id,
            judge_id=metadata.judge_id,
        ).json()


@scoring_router.get(
    "/getAthleteMovesAndBonuses/{heat_id}/{athlete_id}/{run_number}",
    response_class=ORJSONResponse,
    response_model=ScoredMovesAndBonusesResponse,
)
async def get_athlete_moves_and_bonuses(
    heat_id: str,
    athlete_id: str,
    run_number: str,
    judge_id: Annotated[Optional[str], Query(None)],
    db: Session = Depends(get_transaction_session),
) -> ScoredMovesAndBonusesResponse:
    query = (
        db.query(ScoredMoves)
        .filter(ScoredMoves.heat_id == heat_id)
        .filter(ScoredMoves.athlete_id == athlete_id)
        .filter(ScoredMoves.run_number == run_number)
    )
    if judge_id is not None and judge_id.strip():
        query = query.filter(ScoredMoves.judge_id == judge_id)
    moves = query.all()
    pydantic_moves = parse_obj_as(list[PydanticScoredMovesResponse], moves)

    move_ids = [m.id for m in pydantic_moves]

    bonuses = db.query(ScoredBonuses).filter(ScoredBonuses.move_id.in_(move_ids)).all()
    pydantic_bonuses = parse_obj_as(list[PydanticScoredBonusesResponse], bonuses)

    return ScoredMovesAndBonusesResponse.parse_obj(
        {"moves": pydantic_moves, "bonuses": pydantic_bonuses}
    )


class HeatScoresResponse(BaseModel):
    heat_id: UUID
    scores: list[AthleteScoresWithAthleteInfo]


class PhaseScoresResponse(BaseModel):
    phase_id: UUID
    scores: list[AthleteScoresWithAthleteInfo]


@scoring_router.get(
    "/getHeatScores/{heat_id}",
    response_class=ORJSONResponse,
    response_model=HeatScoresResponse,
)
async def get_heat_scores(
    heat_id: str,
    db: Session = Depends(get_transaction_session),
) -> HeatScoresResponse:
    moves = db.query(ScoredMoves).filter(ScoredMoves.heat_id == heat_id).all()
    run_statuses = db.query(RunStatus).filter(RunStatus.heat_id == heat_id).all()
    pydantic_moves = parse_obj_as(list[PydanticScoredMovesResponse], moves)
    athlete_heat = db.query(AthleteHeat).filter(AthleteHeat.heat_id == heat_id).all()
    move_ids = [m.id for m in pydantic_moves]
    athletes = db.query(Athlete).filter(
        Athlete.id.in_([a.athlete_id for a in athlete_heat])
    )

    scoresheets = list(set([a.phases.scoresheet for a in athlete_heat]))
    scoresheet_available_moves = (
        db.query(AvailableMoves).filter(AvailableMoves.sheet_id.in_(scoresheets)).all()
    )

    scoresheet_available_bonuses = (
        db.query(AvailableBonuses)
        .filter(AvailableBonuses.sheet_id.in_(scoresheets))
        .all()
    )
    bonuses = db.query(ScoredBonuses).filter(ScoredBonuses.move_id.in_(move_ids)).all()

    pydantic_bonuses = parse_obj_as(list[PydanticScoredBonusesResponse], bonuses)

    athlete_moves_list = organise_moves_by_athlete_run_judge(
        moves=pydantic_moves, bonuses=pydantic_bonuses
    )
    athlete_moves_with_judges = [
        AthleteMovesWithJudgeInfo(
            **a.dict(),
            number_of_judges=next(
                ath.phases.number_of_judges
                for ath in athlete_heat
                if ath.athlete_id == a.athlete_id
            ),
        )
        for a in athlete_moves_list
    ]

    athlete_scores = calculate_heat_scores(
        athlete_moves_list=athlete_moves_with_judges,
        available_moves=[
            AvailableMoves(**move.dict())
            for move in parse_obj_as(
                list[PydanticAvailableMoves], scoresheet_available_moves
            )
        ],
        available_bonuses=[
            AvailableBonuses(**bonus.dict())
            for bonus in parse_obj_as(
                list[PydanticAvailableBonuses], scoresheet_available_bonuses
            )
        ],
        run_statuses=parse_obj_as(
            list[PydanticRunStatus], run_statuses if run_statuses else []
        ),
    )
    athlete_scores_with_info: list[AthleteScoresWithAthleteInfo] = []
    for a_info in athletes:
        athlete_score = [a for a in athlete_scores if a.athlete_id == a_info.id]
        athlete_scores_with_info.append(
            AthleteScoresWithAthleteInfo(
                **athlete_score[0].dict()
                if athlete_score
                else (
                    AthleteScores(
                        athlete_id=a_info.id, highest_scoring_move=0, run_scores=[]
                    ).dict()
                ),
                first_name=a_info.first_name,
                affiliation=a_info.affiliation,
                last_name=a_info.last_name,
                bib_number=a_info.bib,
            )
        )
    athlete_scores_with_info.sort(key=lambda x: int(x.bib_number))
    athlete_scores_with_info.sort(key=lambda x: x.last_phase_rank or 0)
    return HeatScoresResponse(heat_id=heat_id, scores=athlete_scores_with_info)


@scoring_router.get(
    "/getPhaseScores/{phase_id}",
    response_class=ORJSONResponse,
    response_model=PhaseScoresResponse,
)
async def get_phase_scores(
    phase_id: str,
    db: Session = Depends(get_transaction_session),
) -> PhaseScoresResponse:
    return calculate_phase_scores(phase_id=phase_id, db=db)


def calculate_phase_scores(phase_id: str, db: Session) -> PhaseScoresResponse:
    moves = db.query(ScoredMoves).filter(ScoredMoves.phase_id == phase_id).all()
    run_statuses = db.query(RunStatus).filter(RunStatus.phase_id == phase_id).all()
    phase = db.query(Phase).filter(Phase.id == phase_id).one_or_none()
    if phase is None:
        msg = f"Phase with id : {phase_id} does not exist "
        raise ValueError(msg)
    pydantic_moves = parse_obj_as(list[PydanticScoredMovesResponse], moves)
    athlete_heat = db.query(AthleteHeat).filter(AthleteHeat.phase_id == phase_id).all()
    move_ids = [m.id for m in pydantic_moves]
    athletes: list[Athlete] = (
        db.query(Athlete)
        .filter(Athlete.id.in_([a.athlete_id for a in athlete_heat]))
        .all()
    )
    scoresheets = list(set([a.phases.scoresheet for a in athlete_heat]))
    scoresheet_available_moves = (
        db.query(AvailableMoves).filter(AvailableMoves.sheet_id.in_(scoresheets)).all()
    )

    scoresheet_available_bonuses = (
        db.query(AvailableBonuses)
        .filter(AvailableBonuses.sheet_id.in_(scoresheets))
        .all()
    )
    bonuses = db.query(ScoredBonuses).filter(ScoredBonuses.move_id.in_(move_ids)).all()

    pydantic_bonuses = parse_obj_as(list[PydanticScoredBonusesResponse], bonuses)

    athlete_moves_list = organise_moves_by_athlete_run_judge(
        moves=pydantic_moves,
        bonuses=pydantic_bonuses,
        number_of_runs=phase.number_of_runs,
    )
    athlete_moves_with_judges = [
        AthleteMovesWithJudgeInfo(**a.dict(), number_of_judges=phase.number_of_judges)
        for a in athlete_moves_list
    ]

    athlete_scores = calculate_heat_scores(
        athlete_moves_list=athlete_moves_with_judges,
        available_moves=[
            AvailableMoves(**move.dict())
            for move in parse_obj_as(
                list[PydanticAvailableMoves], scoresheet_available_moves
            )
        ],
        available_bonuses=[
            AvailableBonuses(**bonus.dict())
            for bonus in parse_obj_as(
                list[PydanticAvailableBonuses], scoresheet_available_bonuses
            )
        ],
        run_statuses=parse_obj_as(list[PydanticRunStatus], run_statuses),
        scoring_runs=phase.number_of_runs_for_score,
    )

    athlete_scores_with_info: list[AthleteScoresWithAthleteInfo] = []
    athlete_scores_with_rank = calculate_rank(athlete_scores)
    for a_info in athletes:
        athlete_score = [
            a for a in athlete_scores_with_rank if a.athlete_id == a_info.id
        ]

        athlete_scores_with_info.append(
            AthleteScoresWithAthleteInfo(
                **athlete_score[0].dict(exclude_none=True)
                if len(athlete_score) != 0
                else (
                    AthleteScores(
                        athlete_id=a_info.id,
                        highest_scoring_move=0,
                        run_scores=[],
                    ).dict(exclude_none=True)
                ),
                first_name=a_info.first_name,
                last_name=a_info.last_name,
                bib_number=a_info.bib,
            )
        )
    dns_athletes = [
        a
        for a in athlete_scores_with_info
        if (not check_athlete_started_at_least_one_ride(a))
    ]

    starting_athletes = [
        a
        for a in athlete_scores_with_info
        if check_athlete_started_at_least_one_ride(a)
    ]
    athletes_with_scores = [a for a in starting_athletes if a.ranking]
    athletes_without_scores = [a for a in starting_athletes if not a.ranking]

    athletes_with_scores.sort(key=lambda x: (x.ranking or 999))
    athletes_without_scores.sort(key=lambda x: int(x.bib_number))
    dns_athletes.sort(key=lambda x: int(x.bib_number))

    # Add in specific category for DNS athletes
    return PhaseScoresResponse(
        phase_id=phase_id,
        scores=[*athletes_with_scores, *athletes_without_scores, *dns_athletes],
    )


class RunStatusSchema(BaseModel):
    id: UUID
    heat_id: UUID
    run_number: int
    phase_id: UUID
    athlete_id: UUID
    locked: bool
    did_not_start: bool

    class Config:
        orm_mode = True


@scoring_router.websocket("/current_scores")
async def current_score_websocket(websocket: WebSocket) -> None:
    await websocket.accept()

    try:
        await ws_sender(
            websocket=websocket,
            channel="current_scores",
            fetch_data_with_message=get_moves_from_server,
        )

    except WebSocketDisconnect as e:
        if e.code != 1001:  # 1001 is a "happy" disconnect
            logging.exception("Error with Current Score Websocket")

        await websocket.close()


@scoring_router.websocket("/run_status")
async def runstatus_websocket(websocket: WebSocket) -> None:
    await websocket.accept()
    try:
        await run_until_first_complete(
            (
                ws_receiver,
                {
                    "websocket": websocket,
                    "side_effect": copy_message_to_db,
                    "channel": "run_status",
                },
            ),
            (ws_sender, {"websocket": websocket, "channel": "run_status"}),
        )
    except WebSocketDisconnect as e:
        if e.code != 1001:  # 1001 is a "happy" disconnect
            logging.exception("Error with Current Score Websocket")

        await websocket.close()


def copy_message_to_db(data: str) -> None:
    run_status = RunStatusSchema.parse_raw(data)
    with transaction_session_context_manager() as db:
        existing_run_status = (
            db.query(RunStatus)
            .filter(
                RunStatus.heat_id == run_status.heat_id,
                RunStatus.run_number == run_status.run_number,
                RunStatus.phase_id == run_status.phase_id,
                RunStatus.athlete_id == run_status.athlete_id,
            )
            .first()
        )

        if existing_run_status:
            existing_run_status.locked = run_status.locked
            existing_run_status.did_not_start = run_status.did_not_start
            db.add(existing_run_status)
            db.commit()
            db.refresh(existing_run_status)

        else:
            new_run_status = RunStatus(
                id=run_status.id,
                heat_id=run_status.heat_id,
                run_number=run_status.run_number,
                phase_id=run_status.phase_id,
                athlete_id=run_status.athlete_id,
                locked=run_status.locked,
                did_not_start=run_status.did_not_start,
            )
            db.add(new_run_status)
            db.commit()
            db.refresh(new_run_status)


def check_run_is_locked(
    db: Session, heat_id: str, athlete_id: str, run_number: str, phase_id: str
) -> bool:
    existing_run_status = (
        db.query(RunStatus)
        .filter(
            RunStatus.heat_id == heat_id,
            RunStatus.run_number == run_number,
            RunStatus.phase_id == phase_id,
            RunStatus.athlete_id == athlete_id,
        )
        .first()
    )
    if existing_run_status and existing_run_status.locked:
        return True
    return False
