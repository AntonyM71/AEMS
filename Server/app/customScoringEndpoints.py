from uuid import UUID

from db.client import get_transaction_session
from db.models import (
    Athlete,
    AthleteHeat,
    AvailableBonuses,
    AvailableMoves,
    ScoredBonuses,
    ScoredMoves,
)
from fastapi import APIRouter, Depends
from fastapi.responses import ORJSONResponse
from pydantic import BaseModel, parse_obj_as
from sqlalchemy.orm import Session

from app.scoresheetEndpoints import (
    PydanticAvailableBonuses,
    PydanticAvailableMoves,
)
from app.scoring_logic import (
    AddUpdateScoredMovesRequest,
    AthleteScores,
    AthleteScoresWithAthleteInfo,
    PydanticScoredBonusesResponse,
    PydanticScoredMovesResponse,
    calculate_heat_scores,
    organise_moves_by_athlete_run_judge,
)

scoring_router = APIRouter()


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

    bonuses = db.query(ScoredBonuses).filter(ScoredBonuses.move_id.in_(move_ids)).all()
    pydantic_bonuses = parse_obj_as(list[PydanticScoredBonusesResponse], bonuses)

    return ScoredMovesAndBonusesResponse.parse_obj(
        {"moves": pydantic_moves, "bonuses": pydantic_bonuses}
    )


class HeatScoresResponse(BaseModel):
    heat_id: UUID
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
    # scored_moves = select(ScoredMoves)
    moves = db.query(ScoredMoves).filter(ScoredMoves.heat_id == heat_id).all()
    pydantic_moves = parse_obj_as(list[PydanticScoredMovesResponse], moves)
    athlete_heat = db.query(AthleteHeat).filter(AthleteHeat.heat_id == heat_id).all()
    move_ids = [m.id for m in pydantic_moves]
    athletes = db.query(Athlete).filter(
        Athlete.id.in_([a.athlete_id for a in athlete_heat])
    )
    scoresheets = list(set([a.scoresheet for a in athlete_heat]))
    scoresheet_available_moves= (
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
    athlete_scores = calculate_heat_scores(
        athlete_moves_list=athlete_moves_list,
        available_moves=parse_obj_as(
            list[PydanticAvailableMoves], scoresheet_available_moves
        ),
        available_bonuses=parse_obj_as(
            list[PydanticAvailableBonuses], scoresheet_available_bonuses
        ),
    )
    athlete_scores_with_info: list[AthleteScoresWithAthleteInfo] = []
    for a_info in athletes:
        athlete_score = [a for a in athlete_scores if a.athlete_id == a_info.id]
        athlete_scores_with_info.append(
            AthleteScoresWithAthleteInfo(
                **athlete_score[0].dict() if athlete_score else (AthleteScores(athlete_id = a_info.id, highest_scoring_move=0, run_scores=[]).dict()),
                first_name=a_info.first_name,
                last_name=a_info.last_name,
                bib_number=a_info.bib,
            )
        )
    athlete_scores_with_info.sort(key=lambda x: x.bib_number)

    return HeatScoresResponse(heat_id=heat_id, scores=athlete_scores_with_info)
