from collections import defaultdict
from collections.abc import Callable
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, field_validator


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
    request_id: UUID

    model_config = ConfigDict(from_attributes=True)

    @field_validator("request_id")
    @classmethod
    def _request_id_must_be_v7(cls, value: UUID) -> UUID:
        if value.version != 7:
            msg = "request_id must be a UUIDv7"
            raise ValueError(msg)
        return value


class MixedUpScoresheetExceptionError(Exception):
    pass


class AthleteScoreInfo(BaseModel):
    score: float
    highest_scoring_move: float


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
    """Expects moves from a single paddler, run, and judge.

    Raises MixedUpScoresheetExceptionError if that doesn't hold. Moves sharing
    a move and direction are deduplicated before summing.
    """
    return _score_judge_run(
        scored_moves=scored_moves,
        scored_bonuses=scored_bonuses,
        available_moves_by_id={m.id: m for m in available_moves},
        bonus_scores_by_id={b.id: b.score for b in available_bonuses},
    )


def _score_judge_run(
    scored_moves: list[PydanticScoredMovesResponse],
    scored_bonuses: list[PydanticScoredBonusesResponse],
    available_moves_by_id: dict[UUID, AvailableMoves],
    bonus_scores_by_id: dict[UUID, int],
) -> AthleteScoreInfo:
    validate_all_moves_from_same_judge_run_athlete(scored_moves=scored_moves)
    bonuses_by_move_id: dict[UUID, list[PydanticScoredBonusesResponse]] = defaultdict(
        list
    )
    for bonus in scored_bonuses:
        bonuses_by_move_id[bonus.move_id].append(bonus)
    ids_by_move_and_direction: dict[tuple[UUID, str], list[UUID]] = defaultdict(list)
    for move in scored_moves:
        ids_by_move_and_direction[move.move_id, move.direction].append(move.id)

    move_totals: list[int] = []
    for (move_id, direction), same_move_ids in ids_by_move_and_direction.items():
        move_data = available_moves_by_id[move_id]
        move_score = (
            move_data.fl_score if direction in ("F", "L", "S") else move_data.rb_score
        )
        move_totals.append(
            move_score
            + calculate_bonus_total(
                move_ids=same_move_ids,
                bonuses_by_move_id=bonuses_by_move_id,
                bonus_scores_by_id=bonus_scores_by_id,
            )
        )

    return AthleteScoreInfo(
        score=sum(move_totals),
        highest_scoring_move=max([*move_totals, 0]),
    )


def validate_all_moves_from_same_judge_run_athlete(
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


def calculate_bonus_total(
    move_ids: list[UUID],
    bonuses_by_move_id: dict[UUID, list[PydanticScoredBonusesResponse]],
    bonus_scores_by_id: dict[UUID, int],
) -> int:
    """Sums each distinct bonus scored on any of ``move_ids`` once."""
    distinct_bonus_ids = {
        bonus.bonus_id
        for move_id in move_ids
        for bonus in bonuses_by_move_id.get(move_id, [])
    }
    return sum(bonus_scores_by_id[bonus_id] for bonus_id in distinct_bonus_ids)


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

    moves_by_athlete_run_judge: dict[
        UUID, dict[int, dict[str, list[PydanticScoredMovesResponse]]]
    ] = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))
    for m in moves:
        moves_by_athlete_run_judge[m.athlete_id][m.run_number][m.judge_id].append(m)

    bonuses_by_judge_and_move: dict[
        tuple[str, UUID], list[tuple[int, PydanticScoredBonusesResponse]]
    ] = defaultdict(list)
    for position, b in enumerate(bonuses):
        bonuses_by_judge_and_move[b.judge_id, b.move_id].append((position, b))

    for athlete in sorted(moves_by_athlete_run_judge):
        this_athlete_runs = moves_by_athlete_run_judge[athlete]
        unique_runs = (
            range(0, number_of_runs) if number_of_runs else sorted(this_athlete_runs)
        )
        run_moves_list: list[RunMoves] = []
        for run in unique_runs:
            this_run_moves = this_athlete_runs.get(run, {})
            judge_moves_list: list[JudgeMoves] = []
            for judge in sorted(this_run_moves):
                this_judge_moves = this_run_moves[judge]
                # Input order is kept so the output matches a filter over `bonuses`.
                this_judge_bonuses = sorted(
                    entry
                    for move_id in {m.id for m in this_judge_moves}
                    for entry in bonuses_by_judge_and_move.get((judge, move_id), [])
                )
                judge_moves_list.append(
                    JudgeMoves(
                        judge_id=judge,
                        scored_moves=this_judge_moves,
                        scored_bonuses=[b for _, b in this_judge_bonuses],
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
    first_run_status: dict[tuple[UUID, int], PydanticRunStatus] = {}
    for rs in run_statuses:
        first_run_status.setdefault((rs.athlete_id, rs.run_number), rs)

    available_moves_by_id = {m.id: m for m in available_moves}
    bonus_scores_by_id = {b.id: b.score for b in available_bonuses}

    scores: list[AthleteScores] = []
    for athlete in athlete_moves_list:
        runs = [
            _score_run(
                run,
                number_of_judges=athlete.number_of_judges,
                run_status=first_run_status.get((athlete.athlete_id, run.run)),
                available_moves_by_id=available_moves_by_id,
                bonus_scores_by_id=bonus_scores_by_id,
            )
            for run in athlete.run_moves
        ]
        best_run_scores = sorted(r.mean_run_score for r in runs)
        scores.append(
            AthleteScores(
                run_scores=runs,
                athlete_id=athlete.athlete_id,
                highest_scoring_move=max(r.highest_scoring_move for r in runs),
                total_score=sum(best_run_scores[-scoring_runs:]) if scoring_runs else 0,
            )
        )
    return scores


def _score_run(
    run: RunMoves,
    number_of_judges: int,
    run_status: PydanticRunStatus | None,
    available_moves_by_id: dict[UUID, AvailableMoves],
    bonus_scores_by_id: dict[UUID, int],
) -> RunScores:
    judges = [
        JudgeScores(
            judge_id=judge.judge_id,
            score_info=_score_judge_run(
                scored_moves=judge.scored_moves,
                scored_bonuses=judge.scored_bonuses,
                available_moves_by_id=available_moves_by_id,
                bonus_scores_by_id=bonus_scores_by_id,
            ),
        )
        for judge in run.judge_moves
    ]
    did_not_start = run_status.did_not_start if run_status else False
    if did_not_start:
        mean_run_score = 0
        highest_scoring_move = 0
    else:
        mean_run_score = round(
            sum(j.score_info.score for j in judges)
            / max(number_of_judges, len(judges)),
            2,
        )
        highest_scoring_move = max(
            (j.score_info.highest_scoring_move for j in judges), default=0
        )
    return RunScores(
        judge_scores=judges,
        run_number=run.run,
        mean_run_score=mean_run_score,
        highest_scoring_move=highest_scoring_move,
        did_not_start=did_not_start,
        locked=run_status.locked if run_status else False,
    )


class RankInfo(BaseModel):
    ranking: int
    reason: str | None = None


def check_athlete_started_at_least_one_ride(athlete_info: AthleteScores) -> bool:
    dns_list = [a.did_not_start for a in athlete_info.run_scores]

    return not (dns_list and all(dns_list))


def _floats_match(a: float | None, b: float) -> bool:
    """True when two scores are equal to two decimal places.

    A score that is itself a sum of ``round(mean, 2)`` values (``total_score``)
    can leave two athletes who genuinely tie a float ULP apart, so every
    tie-break comparison is made at the precision scores are reported to
    rather than with raw float equality. ``a`` may be ``None`` (an athlete
    with no score never matches); ``b`` is the current athlete's score,
    always non-``None``.
    """
    return a is not None and round(a, 2) == round(b, 2)


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
            item
            for item in sorted_athletes_scores
            if _floats_match(item.total_score, s.total_score)
            and check_athlete_started_at_least_one_ride(item)
        ]
        athletes_ranked_above = sum(
            1
            for a in sorted_athletes_scores
            if a.total_score is not None
            and round(a.total_score, 2) > round(s.total_score, 2)
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
    run_count = max(len(a.run_scores), len(this_athlete.run_scores))
    return (
        _floats_match(a.total_score, this_athlete.total_score)
        and a.highest_scoring_move == this_athlete.highest_scoring_move
        and [get_nth_highest_score(i)(a) for i in range(run_count)]
        == [get_nth_highest_score(i)(this_athlete) for i in range(run_count)]
    )


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
        if all(
            _floats_match(value_of(a), value_of(this_athlete))
            for _c, value_of in criteria
        )
    ]
    if len(still_tied) > 1:
        remaining = ", ".join(
            _athlete_label(a.athlete_id, bib_numbers) for a in still_tied
        )
        return f"Tie unresolved - athletes remain tied: {remaining}"

    rival = (
        resolved_order[position - 1] if position > 0 else resolved_order[position + 1]
    )

    # Narrows to athletes not yet separated from this_athlete by an earlier
    # criterion, until the criterion that also separates it from its rival.
    group = tied_athletes
    for criterion, value_of in criteria:
        if not _floats_match(value_of(this_athlete), value_of(rival)):
            # resolved_order already reflects every criterion, including ones
            # after this one, so filtering it (rather than re-sorting `group`
            # on this criterion alone) keeps ties within the group in their
            # true finishing order instead of caller-supplied input order.
            ordered = [a for a in resolved_order if a in group]
            compared = ", ".join(
                f"{_athlete_label(a.athlete_id, bib_numbers)} ({value_of(a):.2f})"
                for a in ordered
            )
            return f"Tie resolved by {criterion}: {compared}"
        group = [a for a in group if _floats_match(value_of(a), value_of(this_athlete))]

    msg = "rival draws on every criterion yet is not in still_tied"
    raise AssertionError(msg)
