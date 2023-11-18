from app.scoring_logic import calculate_run_score


class TestScoring:
    def test_it_returns_zero_with_no_moves(self ):
        scored_moves = []
        scored_bonuses = []
        available_moves = []
        available_bonuses = []

        score = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert score == 0
