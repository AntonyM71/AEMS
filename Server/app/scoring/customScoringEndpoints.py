from math import inf
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends
from fastapi.responses import ORJSONResponse
from pydantic import BaseModel, parse_obj_as
from sqlalchemy.orm import Session

from app.scoresheetEndpoints import (
    PydanticAvailableBonuses,
    PydanticAvailableMoves,
)
from app.scoring.scoring_logic import (
    AddUpdateScoredMovesRequest,
    AthleteMovesWithJudgeInfo,
    AthleteScores,
    AthleteScoresWithAthleteInfo,
    PydanticScoredBonusesResponse,
    PydanticScoredMovesResponse,
    calculate_heat_scores,
    calculate_rank,
    organise_moves_by_athlete_run_judge,
)
from db.client import get_transaction_session
from db.models import (
    Athlete,
    AthleteHeat,
    AvailableBonuses,
    AvailableMoves,
    Phase,
    ScoredBonuses,
    ScoredMoves,
)

scoring_router = APIRouter()


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
    heat_info = db.query(AthleteHeat).where(
        AthleteHeat.heat_id == heat_id).all()

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
            bib=h.athletes.bib,
            last_phase_rank=h.last_phase_rank,
            event_name=h.phases.event.name,
        )
        for h in heat_info
    ]
    heat_info_response.sort(key=lambda x: int(x.bib))
    heat_info_response.sort(key=lambda x: x.last_phase_rank or inf)
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
    heat_info = db.query(AthleteHeat).where(
        AthleteHeat.heat_id == heat_id).all()

    phases = set([h.__dict__["phase_id"] for h in heat_info])
    phase_info = db.query(Phase).where(Phase.id.in_(list(phases))).all()
    return parse_obj_as(list[PhaseResponse], phase_info)


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
    with db.begin():
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


class ScoredMovesAndBonusesResponse(BaseModel):
    moves: list[PydanticScoredMovesResponse]
    bonuses: list[PydanticScoredBonusesResponse]

    class Config:
        orm_mode = True


@scoring_router.get(
    "/getAthleteMovesAndBonuses/{heat_id}/{athlete_id}/{run_number}/{judge_id}",
    response_class=ORJSONResponse,
    response_model=ScoredMovesAndBonusesResponse,
)
async def get_athlete_moves_and_bonnuses(
    heat_id: str,
    athlete_id: str,
    run_number: str,
    judge_id: str,
    db: Session = Depends(get_transaction_session),
) -> ScoredMovesAndBonusesResponse:
    # scored_moves = select(ScoredMoves)
    moves = (
        db.query(ScoredMoves)
        .filter(ScoredMoves.heat_id == heat_id)
        .filter(ScoredMoves.athlete_id == athlete_id)
        .filter(ScoredMoves.run_number == run_number)
        .filter(ScoredMoves.judge_id == judge_id)
        .all()
    )
    pydantic_moves = parse_obj_as(list[PydanticScoredMovesResponse], moves)

    move_ids = [m.id for m in pydantic_moves]

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
    pydantic_moves = parse_obj_as(list[PydanticScoredMovesResponse], moves)
    athlete_heat = db.query(AthleteHeat).filter(
        AthleteHeat.heat_id == heat_id).all()
    move_ids = [m.id for m in pydantic_moves]
    athletes = db.query(Athlete).filter(
        Athlete.id.in_([a.athlete_id for a in athlete_heat])
    )

    scoresheets = list(set([a.phases.scoresheet for a in athlete_heat]))
    scoresheet_available_moves = (
        db.query(AvailableMoves).filter(
            AvailableMoves.sheet_id.in_(scoresheets)).all()
    )

    scoresheet_available_bonuses = (
        db.query(AvailableBonuses)
        .filter(AvailableBonuses.sheet_id.in_(scoresheets))
        .all()
    )
    bonuses = db.query(ScoredBonuses).filter(
        ScoredBonuses.move_id.in_(move_ids)).all()

    pydantic_bonuses = parse_obj_as(
        list[PydanticScoredBonusesResponse], bonuses)

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
        available_bonuses=parse_obj_as(
            list[PydanticAvailableBonuses], scoresheet_available_bonuses
        ),
    )
    athlete_scores_with_info: list[AthleteScoresWithAthleteInfo] = []
    for a_info in athletes:
        athlete_score = [
            a for a in athlete_scores if a.athlete_id == a_info.id]
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
    moves = db.query(ScoredMoves).filter(
        ScoredMoves.phase_id == phase_id).all()
    phase = db.query(Phase).filter(Phase.id == phase_id).one_or_none()
    if phase is None:
        msg = f"Phase with id : {phase_id} does not exist "
        raise ValueError(msg)
    pydantic_moves = parse_obj_as(list[PydanticScoredMovesResponse], moves)
    athlete_heat = db.query(AthleteHeat).filter(
        AthleteHeat.phase_id == phase_id).all()
    move_ids = [m.id for m in pydantic_moves]
    athletes: list[Athlete] = db.query(Athlete).filter(
        Athlete.id.in_([a.athlete_id for a in athlete_heat])
    ).all()
    scoresheets = list(set([a.phases.scoresheet for a in athlete_heat]))
    scoresheet_available_moves = (
        db.query(AvailableMoves).filter(
            AvailableMoves.sheet_id.in_(scoresheets)).all()
    )

    scoresheet_available_bonuses = (
        db.query(AvailableBonuses)
        .filter(AvailableBonuses.sheet_id.in_(scoresheets))
        .all()
    )
    bonuses = db.query(ScoredBonuses).filter(
        ScoredBonuses.move_id.in_(move_ids)).all()

    pydantic_bonuses = parse_obj_as(
        list[PydanticScoredBonusesResponse], bonuses)

    athlete_moves_list = organise_moves_by_athlete_run_judge(
        moves=pydantic_moves, bonuses=pydantic_bonuses
    )
    athlete_moves_with_judges = [
        AthleteMovesWithJudgeInfo(
            **a.dict(), number_of_judges=phase.number_of_judges)
        for a in athlete_moves_list
    ]

    athlete_scores = calculate_heat_scores(
        athlete_moves_list=athlete_moves_with_judges,
        available_moves=parse_obj_as(
            list[PydanticAvailableMoves], scoresheet_available_moves
        ),
        available_bonuses=parse_obj_as(
            list[PydanticAvailableBonuses], scoresheet_available_bonuses
        ),
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
                        athlete_id=a_info.id, highest_scoring_move=0, run_scores=[]
                    ).dict(exclude_none=True)
                ),
                first_name=a_info.first_name,
                last_name=a_info.last_name,
                bib_number=a_info.bib,
            )
        )
    athletes_with_scores = [a for a in athlete_scores_with_info if a.ranking]
    athletes_without_scores = [
        a for a in athlete_scores_with_info if not a.ranking]
    athletes_without_scores = [
        a for a in athlete_scores_with_info if not a.ranking]
    athletes_with_scores.sort(key=lambda x: (x.ranking or 999))
    athletes_without_scores.sort(key=lambda x: int(x.bib_number))

    return PhaseScoresResponse(
        phase_id=phase_id, scores=[
            *athletes_with_scores, *athletes_without_scores]
    )
