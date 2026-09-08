from collections.abc import Callable
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict


def all_equal(iterable: list) -> bool:
    return len({*iterable}) <= 1


class PydanticScoredMoves(BaseModel):
    id: UUID
    move_id: UUID
    direction: Literal["L", "R", "F", "B", "S"]


class PydanticScoredBonuses(BaseModel):
    id: UUID
    bonus_id: UUID
    move_id: UUID


class AddUpdateScoredMovesRequest(BaseModel):
    moves: list[PydanticScoredMoves] = []
    bonuses: list[PydanticScoredBonuses] = []

    model_config = ConfigDict(from_attributes=True)


class MixedUpScoresheetExceptionError(Exception):
    """for when scoresheets contain mixed up moves"""


class AthleteScoreInfo(BaseModel):
    score: float
    highest_scoring_move: float


class PydanticScoredMoveWithBonus(BaseModel):
    id: UUID
    move_id: UUID
    heat_id: UUID
    run_number: int
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

    model_config = ConfigDict(from_attributes=True)


class PydanticScoredBonusesResponse(BaseModel):
    id: UUID
    move_id: UUID
    bonus_id: UUID
    judge_id: str

    model_config = ConfigDict(from_attributes=True)


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
            filtered_move_scores[move_metahash] = scored_move.total_score_with_bonuses

    return AthleteScoreInfo(
        score=sum(filtered_move_scores.values()),
        highest_scoring_move=max([*filtered_move_scores.values(), 0]),
    )


def check_moves_have_same_run_judge_athlete_heat(
    scored_moves: list[PydanticScoredMovesResponse],
) -> None:
    fields = [
        ("judge_id", "different judges"),
        ("run_number", "different run_numbers"),
        ("athlete_id", "different athlete_ids"),
        ("heat_id", "different heat_ids"),
        ("phase_id", "different phase_ids"),
    ]
    for attr, label in fields:
        if not all_equal([getattr(sm, attr) for sm in scored_moves]):
            msg = f"Move List contains moves from {label}"
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
        same_move_ids = [
            m.id
            for m in scored_moves
            if m.move_id == move.move_id and m.direction == move.direction
        ]
        this_move_scoredata = next(
            sd for sd in available_moves if sd.id == move.move_id
        )
        this_scored_move_score = (
            this_move_scoredata.fl_score
            if move.direction in (["F", "L", "S"])
            else this_move_scoredata.rb_score
        )
        bonus_total = calculate_bonus_total(
            move_ids=same_move_ids,
            scored_bonuses=scored_bonuses,
            available_bonuses=available_bonuses,
        )
        scored_move_scores.append(
            PydanticScoredMoveWithBonus(
                **move.model_dump(),
                total_score_with_bonuses=this_scored_move_score + bonus_total,
            )
        )
    return scored_move_scores


def calculate_bonus_total(
    move_ids: list[UUID],
    scored_bonuses: list[PydanticScoredBonusesResponse],
    available_bonuses: list[AvailableBonuses],
) -> int:
    associated_bonuses = [ab for ab in scored_bonuses if ab.move_id in move_ids]
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


class AthleteMovesWithJudgeInfo(AthleteMoves):
    number_of_judges: int


class JudgeScores(BaseModel):
    judge_id: str
    score_info: AthleteScoreInfo


class RunScores(BaseModel):
    run_number: int
    judge_scores: list[JudgeScores]
    mean_run_score: float
    highest_scoring_move: float
    locked: bool
    did_not_start: bool


class AthleteScores(BaseModel):
    athlete_id: UUID
    run_scores: list[RunScores]
    highest_scoring_move: float
    ranking: int | None = None
    reason: str | None = None
    total_score: float | None = None
    last_phase_rank: int | None = None


class AthleteScoresWithAthleteInfo(AthleteScores):
    first_name: str
    last_name: str
    affiliation: str | None = None
    bib_number: int


def organise_moves_by_athlete_run_judge(
    moves: list[PydanticScoredMovesResponse],
    bonuses: list[PydanticScoredBonusesResponse],
    number_of_runs: int | None = None,
) -> list[AthleteMoves]:
    resp: list[AthleteMoves] = []

    unique_athletes = list({move.athlete_id for move in moves})
    unique_athletes.sort()
    for athlete in unique_athletes:
        this_athlete_moves = [m for m in moves if m.athlete_id == athlete]
        if number_of_runs:
            unique_runs = list(range(0, number_of_runs))
        else:
            unique_runs = list({m.run_number for m in this_athlete_moves})
        unique_runs.sort()
        run_moves_list: list[RunMoves] = []
        for run in unique_runs:
            this_run_noves = [m for m in this_athlete_moves if m.run_number == run]

            unique_judges = list({m.judge_id for m in this_run_noves})
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


class PydanticRunStatus(BaseModel):
    id: UUID
    athlete_id: UUID
    heat_id: UUID
    run_number: int
    phase_id: UUID
    locked: bool
    did_not_start: bool

    model_config = ConfigDict(from_attributes=True)


def calculate_heat_scores(
    athlete_moves_list: list[AthleteMovesWithJudgeInfo],
    available_moves: list[AvailableMoves],
    available_bonuses: list[AvailableBonuses],
    run_statuses: list[PydanticRunStatus],
    scoring_runs: int | None = None,
) -> list[AthleteScores]:
    scores: list[AthleteScores] = []
    for athlete in athlete_moves_list:
        runs: list[RunScores] = []
        for run in athlete.run_moves:
            matching_run_statuses = [
                rs
                for rs in run_statuses
                if rs.athlete_id == athlete.athlete_id and rs.run_number == run.run
            ]
            run_status = (
                matching_run_statuses[0] if len(matching_run_statuses) > 0 else None
            )
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
                    mean_run_score=0
                    if run_status and run_status.did_not_start
                    else round(
                        sum([j.score_info.score for j in judges])
                        / max([athlete.number_of_judges, len(judges)]),
                        2,
                    ),
                    highest_scoring_move=0
                    if run_status and run_status.did_not_start
                    else max(
                        [j.score_info.highest_scoring_move for j in judges], default=0
                    ),
                    did_not_start=run_status.did_not_start if run_status else False,
                    locked=run_status.locked if run_status else False,
                )
            )
        run_scores: list[float] = [r.mean_run_score for r in runs]
        run_scores.sort()

        total_score = sum(run_scores[-scoring_runs:]) if scoring_runs else 0
        scores.append(
            AthleteScores(
                run_scores=runs,
                athlete_id=athlete.athlete_id,
                highest_scoring_move=max(r.highest_scoring_move for r in runs),
                total_score=total_score,
            )
        )
    return scores


class RankInfo(BaseModel):
    ranking: int
    reason: str | None = None


def check_athlete_started_at_least_one_ride(athlete_info: AthleteScores) -> bool:
    dns_list = [a.did_not_start for a in athlete_info.run_scores]

    if len(dns_list) == 0:
        return True
    if all(dns_list):
        return False
    return True


def calculate_rank(
    athlete_scores: list[AthleteScores],
    bib_numbers: dict[UUID, str] | None = None,
) -> list[AthleteScores]:
    sorted_athletes_scores = sorted(
        athlete_scores, key=lambda x: x.total_score or 0, reverse=True
    )

    for s in sorted_athletes_scores:
        if s.total_score is None or not check_athlete_started_at_least_one_ride(s):
            continue

        athletes_with_same_score = [
            item for item in sorted_athletes_scores if item.total_score == s.total_score
        ]
        athletes_ranked_above = sum(
            1
            for a in sorted_athletes_scores
            if a.total_score is not None
            and a.total_score > s.total_score
            and check_athlete_started_at_least_one_ride(a)
        )

        if len(athletes_with_same_score) == 1:
            s.ranking = athletes_ranked_above + 1
        else:
            rank_info = calculate_tied_rank(s.athlete_id, athletes_with_same_score)
            s.ranking = athletes_ranked_above + rank_info.ranking + 1
            s.reason = build_tie_break_reason(
                s.athlete_id, athletes_with_same_score, bib_numbers
            )

    return sorted_athletes_scores


def calculate_tied_rank(
    athlete_id: UUID, athlete_scores: list[AthleteScores]
) -> RankInfo:
    number_of_runs = max(len(a.run_scores) for a in athlete_scores)
    sorted_athlete_score = _resolve_tie_order(
        athlete_scores, _tie_break_criteria(number_of_runs)
    )
    if (
        len(
            fully_tied_athletes := athletes_with_this_exact_score_after_tiebreak(
                athlete_id=athlete_id, athlete_scores=athlete_scores
            )
        )
        != 1
    ):
        return RankInfo(
            ranking=min(
                [
                    sorted_athlete_score.index(
                        next(
                            filter(
                                lambda n, a=a: n.athlete_id == a,
                                sorted_athlete_score,
                            )
                        )
                    )
                    for a in fully_tied_athletes
                ]
            ),
            reason="Fully Tied",
        )

    return RankInfo(
        ranking=sorted_athlete_score.index(
            next(filter(lambda n: n.athlete_id == athlete_id, sorted_athlete_score))
        ),
        reason="Resolved by Tiebreak Engine",
    )


def athletes_with_this_exact_score_after_tiebreak(
    athlete_id: UUID, athlete_scores: list[AthleteScores]
) -> list[UUID]:
    this_athlete = next(a for a in athlete_scores if a.athlete_id == athlete_id)
    return [
        a.athlete_id for a in athlete_scores if athlete_is_fully_tied(a, this_athlete)
    ]


def athlete_is_fully_tied(a: AthleteScores, this_athlete: AthleteScores) -> bool:
    if (
        a.total_score == this_athlete.total_score
        and a.highest_scoring_move == this_athlete.highest_scoring_move
        and [get_nth_highest_score(i)(a) for i, r in enumerate(a.run_scores)]
        == [
            get_nth_highest_score(i)(this_athlete)
            for i, r in enumerate(this_athlete.run_scores)
        ]
    ):
        return True
    return False


def get_nth_highest_score(index: int) -> Callable[[AthleteScores], float]:
    def get_highest_score_for_n(x: AthleteScores) -> float:
        sorted_run_scores = sorted(
            x.run_scores, key=lambda y: y.mean_run_score, reverse=True
        )
        try:
            return sorted_run_scores[index].mean_run_score
        except IndexError:
            return 0

    return get_highest_score_for_n


def _ordinal(number: int) -> str:
    if 10 <= number % 100 <= 20:
        suffix = "th"
    else:
        suffix = {1: "st", 2: "nd", 3: "rd"}.get(number % 10, "th")
    return f"{number}{suffix}"


def _athlete_label(athlete_id: UUID, bib_numbers: dict[UUID, str] | None) -> str:
    if bib_numbers and athlete_id in bib_numbers:
        return f"#{bib_numbers[athlete_id]}"
    return f"athlete {athlete_id}"


def _tie_break_criteria(
    number_of_runs: int,
) -> list[tuple[str, Callable[[AthleteScores], float]]]:
    criteria: list[tuple[str, Callable[[AthleteScores], float]]] = [
        (
            "highest scoring run"
            if position == 0
            else f"{_ordinal(position + 1)} highest scoring run",
            get_nth_highest_score(position),
        )
        for position in range(number_of_runs)
    ]
    criteria.append(("highest scoring move", lambda a: a.highest_scoring_move))
    return criteria


def _resolve_tie_order(
    tied_athletes: list[AthleteScores],
    criteria: list[tuple[str, Callable[[AthleteScores], float]]],
) -> list[AthleteScores]:
    """Order a tied group by the ICF tie-breakers, best first.

    Sorts are applied lowest-precedence first so the stable sort leaves the
    highest-precedence criterion dominant. This is the single sort used both to
    assign ranks (``calculate_tied_rank``) and to explain them
    (``build_tie_break_reason``).
    """
    ordered = list(tied_athletes)
    for _criterion, value_of in reversed(criteria):
        ordered.sort(key=value_of, reverse=True)
    return ordered


def build_tie_break_reason(
    athlete_id: UUID,
    tied_athletes: list[AthleteScores],
    bib_numbers: dict[UUID, str] | None,
) -> str:
    number_of_runs = max(len(a.run_scores) for a in tied_athletes)
    criteria = _tie_break_criteria(number_of_runs)
    resolved_order = _resolve_tie_order(tied_athletes, criteria)
    position = next(
        i for i, a in enumerate(resolved_order) if a.athlete_id == athlete_id
    )
    this_athlete = resolved_order[position]

    # Athletes this athlete draws with on every criterion (0-padding a shorter
    # run list) — the ones no tie-breaker can separate.
    still_tied = [
        a
        for a in resolved_order
        if all(value_of(a) == value_of(this_athlete) for _c, value_of in criteria)
    ]
    if len(still_tied) > 1:
        remaining = ", ".join(
            _athlete_label(a.athlete_id, bib_numbers) for a in still_tied
        )
        return f"Tie unresolved - athletes remain tied: {remaining}"

    rival = (
        resolved_order[position - 1] if position > 0 else resolved_order[position + 1]
    )
    for criterion, value_of in criteria:
        if value_of(this_athlete) != value_of(rival):
            pair = sorted([this_athlete, rival], key=value_of, reverse=True)
            compared = ", ".join(
                f"{_athlete_label(a.athlete_id, bib_numbers)} ({value_of(a):.2f})"
                for a in pair
            )
            return f"Tie resolved by {criterion}: {compared}"

    msg = "rival draws on every criterion yet is not in still_tied"
    raise AssertionError(msg)
