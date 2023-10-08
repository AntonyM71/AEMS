

from app.customScoringEndpoints import (
    AvailableBonuses,
    AvailableMoves,
    PydanticScoredBonusesResponse,
    PydanticScoredMovesResponse,
)


def calculate_run_score(scored_moves:list[PydanticScoredMovesResponse], scored_bonuses:list[PydanticScoredBonusesResponse], available_moves: list[AvailableMoves], available_bonuses: list[AvailableBonuses]) -> int:
    return 0