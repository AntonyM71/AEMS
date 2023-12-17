from itertools import groupby
from statistics import mean
from typing import Literal, Optional
from uuid import UUID

from pydantic import BaseModel


def all_equal(iterable: list) -> bool:
    g = groupby(iterable)
    return next(g, True) and not next(g, False)


class PydanticScoredMoves(BaseModel):
    id: UUID
    move_id: UUID
    direction: Literal["L", "R", "F", "B", "LF", "RB"]


class PydanticScoredBonuses(BaseModel):
    id: UUID
    bonus_id: UUID
    move_id: UUID


class AddUpdateScoredMovesRequest(BaseModel):
    moves: list[PydanticScoredMoves] = []
    bonuses: list[PydanticScoredBonuses] = []

    class Config:
        orm_mode = True


class MixedUpScoresheetExceptionError(Exception):
    """for when scoresheets contain mixed up moves"""


class AthleteScoreInfo(BaseModel):
    score: float
    highest_scoring_move: float


class PydanticScoredMoveWithBonus(BaseModel):
    id: UUID
    move_id: UUID
    heat_id: UUID
    run_number: str
    phase_id: UUID
    judge_id: str
    athlete_id: UUID
    direction: str
    total_score_with_bonuses: float


class PydanticScoredMovesResponse(BaseModel):
    id: UUID
    move_id: UUID
    heat_id: UUID
    run_number: int
    phase_id: UUID
    judge_id: str
    athlete_id: UUID
    direction: str

    class Config:
        orm_mode = True


class PydanticScoredBonusesResponse(BaseModel):
    id: UUID
    move_id: UUID
    bonus_id: UUID
    judge_id: str

    class Config:
        orm_mode = True


class AvailableMoves(BaseModel):
    id: UUID
    sheet_id: UUID
    name: str
    fl_score: int
    rb_score: int
    direction: str


class AvailableBonuses(BaseModel):
    id: UUID
    sheet_id: UUID
    move_id: UUID
    name: str
    score: int


def calculate_run_score(
    scored_moves: list[PydanticScoredMovesResponse],
    scored_bonuses: list[PydanticScoredBonusesResponse],
    available_moves: list[AvailableMoves],
    available_bonuses: list[AvailableBonuses],
) -> AthleteScoreInfo:
    # This function is intended to be used for a single paddler, for a single run, for a single judge.
    # It will simply add up any scores you give it, and only deduplicated duplicated mvoes and bonuses.
    # It does NOT filter by judge, run, athlete etc.
    check_moves_have_same_run_judge_athlete_heat(scored_moves=scored_moves)
    filtered_move_scores: dict[str, float] = {}

    scored_move_list_with_scores = calculate_individual_move_scores(
        scored_moves=scored_moves,
        scored_bonuses=scored_bonuses,
        available_moves=available_moves,
        available_bonuses=available_bonuses,
    )

    for scored_move in scored_move_list_with_scores:
        move_metahash = make_move_string(scored_move)

        if not filtered_move_scores.get(move_metahash):
            # possible_duplicates = [ pd for pd in scored_move_list_with_scores if pd.move_id == scored_move.move]
            filtered_move_scores[move_metahash] = scored_move.total_score_with_bonuses
        else:
            if (
                filtered_move_scores[move_metahash]
                < scored_move.total_score_with_bonuses
            ):
                filtered_move_scores[
                    move_metahash
                ] = scored_move.total_score_with_bonuses

    return AthleteScoreInfo(
        score=sum(filtered_move_scores.values()),
        highest_scoring_move=max([*filtered_move_scores.values(), 0]),
    )


def check_moves_have_same_run_judge_athlete_heat(
    scored_moves: list[PydanticScoredMovesResponse],
) -> None:
    if not all_equal([sm.judge_id for sm in scored_moves]):
        msg = "Move List contains moves from different judges"
        raise MixedUpScoresheetExceptionError(msg)
    if not all_equal([sm.run_number for sm in scored_moves]):
        msg = "Move List contains moves from different run_numbers"
        raise MixedUpScoresheetExceptionError(msg)
    if not all_equal([sm.athlete_id for sm in scored_moves]):
        msg = "Move List contains moves from different athlete_ids"
        raise MixedUpScoresheetExceptionError(msg)
    if not all_equal([sm.heat_id for sm in scored_moves]):
        msg = "Move List contains moves from different heat_ids"
        raise MixedUpScoresheetExceptionError(msg)
    if not all_equal([sm.phase_id for sm in scored_moves]):
        msg = "Move List contains moves from different phase_ids"
        raise MixedUpScoresheetExceptionError(msg)


def make_move_string(move: PydanticScoredMoveWithBonus) -> str:
    return f"{move.move_id}{move.direction}{move.athlete_id}{move.judge_id}{move.run_number}"


def calculate_individual_move_scores(
    scored_moves: list[PydanticScoredMovesResponse],
    scored_bonuses: list[PydanticScoredBonusesResponse],
    available_moves: list[AvailableMoves],
    available_bonuses: list[AvailableBonuses],
) -> list[PydanticScoredMoveWithBonus]:
    scored_move_scores: list[PydanticScoredMoveWithBonus] = []

    for move in scored_moves:
        this_move_scoredata = next(
            sd for sd in available_moves if sd.id == move.move_id
        )
        this_scored_move_score = (
            this_move_scoredata.fl_score
            if move.direction in ("FL")
            else this_move_scoredata.rb_score
        )
        bonus_total = calculate_bonus_total(
            move_id=move.id,
            scored_bonuses=scored_bonuses,
            available_bonuses=available_bonuses,
        )
        scored_move_scores.append(
            PydanticScoredMoveWithBonus(
                **move.dict(),
                total_score_with_bonuses=this_scored_move_score + bonus_total,
            )
        )
    return scored_move_scores


def calculate_bonus_total(
    move_id: UUID,
    scored_bonuses: list[PydanticScoredBonusesResponse],
    available_bonuses: list[AvailableBonuses],
) -> int:
    associated_bonuses = [ab for ab in scored_bonuses if ab.move_id == move_id]
    bonus_scores: list[int] = []
    already_scored_bonuses = []
    for bonus in associated_bonuses:
        bonus_info = [bi for bi in available_bonuses if bi.id == bonus.bonus_id]
        if bonus_info[0].id not in already_scored_bonuses:
            bonus_scores.append(bonus_info[0].score)
            already_scored_bonuses.append(bonus_info[0].id)

    return sum(bonus_scores)


class JudgeMoves(BaseModel):
    judge_id: str
    scored_moves: list[PydanticScoredMovesResponse]
    scored_bonuses: list[PydanticScoredBonusesResponse]


class RunMoves(BaseModel):
    run: int
    judge_moves: list[JudgeMoves]


class AthleteMoves(BaseModel):
    athlete_id: UUID
    run_moves: list[RunMoves]


class JudgeScores(BaseModel):
    judge_id: str
    score_info: AthleteScoreInfo


class RunScores(BaseModel):
    run_number: int
    judge_scores: list[JudgeScores]
    mean_run_score: float
    highest_scoring_move: float


class AthleteScores(BaseModel):
    athlete_id: UUID
    run_scores: list[RunScores]
    highest_scoring_move: float
    ranking: Optional[int]
    reason: Optional[str]


class AthleteScoresWithAthleteInfo(AthleteScores):
    first_name: str
    last_name: str
    bib_number: int



def organise_moves_by_athlete_run_judge(
    moves: list[PydanticScoredMovesResponse],
    bonuses: list[PydanticScoredBonusesResponse],
) -> list[AthleteMoves]:
    resp: list[AthleteMoves] = []

    unique_athletes = list(set(move.athlete_id for move in moves))
    unique_athletes.sort()
    for athlete in unique_athletes:
        this_athlete_moves = [m for m in moves if m.athlete_id == athlete]
        unique_runs = list(set(m.run_number for m in this_athlete_moves))
        unique_runs.sort()
        run_moves_list: list[RunMoves] = []
        for run in unique_runs:
            this_run_noves = [m for m in this_athlete_moves if m.run_number == run]

            unique_judges = list(set(m.judge_id for m in this_run_noves))
            unique_judges.sort()
            judge_moves_list: list[JudgeMoves] = []
            for judge in unique_judges:
                this_judge_moves = [m for m in this_run_noves if m.judge_id == judge]
                this_judge_move_ids = [m.id for m in this_judge_moves]
                this_judge_bonuses = [b for b in bonuses if b.judge_id == judge]
                judge_moves_list.append(
                    JudgeMoves(
                        judge_id=judge,
                        scored_moves=this_judge_moves,
                        scored_bonuses=[
                            b
                            for b in this_judge_bonuses
                            if b.move_id in this_judge_move_ids
                        ],
                    )
                )
            run_moves_list.append(RunMoves(run=run, judge_moves=judge_moves_list))
        resp.append(AthleteMoves(run_moves=run_moves_list, athlete_id=athlete))
    return resp


def calculate_heat_scores(
    athlete_moves_list: list[AthleteMoves],
    available_moves: list[AvailableMoves],
    available_bonuses: list[AvailableBonuses],
) -> list[AthleteScores]:
    scores: list[AthleteScores] = []
    for athlete in athlete_moves_list:
        runs: list[RunScores] = []
        for run in athlete.run_moves:
            judges: list[JudgeScores] = []
            for judge in run.judge_moves:
                score = calculate_run_score(
                    scored_moves=judge.scored_moves,
                    scored_bonuses=judge.scored_bonuses,
                    available_moves=available_moves,
                    available_bonuses=available_bonuses,
                )
                judges.append(JudgeScores(score_info=score, judge_id=judge.judge_id))
            runs.append(
                RunScores(
                    judge_scores=judges,
                    run_number=run.run,
                    mean_run_score=mean([j.score_info.score for j in judges]),
                    highest_scoring_move=max(
                        [j.score_info.highest_scoring_move for j in judges]
                    ),
                )
            )
        scores.append(
            AthleteScores(
                run_scores=runs,
                athlete_id=athlete.athlete_id,
                highest_scoring_move=max(r.highest_scoring_move for r in runs),
            )
        )
    return scores
