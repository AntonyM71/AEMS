import random
from uuid import UUID

import pytest

from app.competition_management.competition_management import (
    AthleteIDandRank,
    assign_paddlers_to_heat,
    get_top_n_paddlers_for_phase,
)
from app.scoring.customScoringEndpoints import PhaseScoresResponse
from app.scoring.scoring_logic import AthleteScoresWithAthleteInfo


class TestAssignPaddlersToHeat:
    def test_it_returns_an_empty_dict_with_no_heats_or_paddlers(self) -> None:
        want = {}
        got = assign_paddlers_to_heat(paddlers=[], heat_ids=[])

        assert got == want

    def test_it_makes_an_empty_heat_if_no_paddlers_are_provided(self) -> None:
        want = {"fdfe05d8-bdd6-4c19-90cd-1ac462a3ec1e": []}
        got = assign_paddlers_to_heat(
            paddlers=[], heat_ids=["fdfe05d8-bdd6-4c19-90cd-1ac462a3ec1e"]
        )

        assert got == want

    def test_it_adds_paddlers_to_heats(self) -> None:
        random.seed(10)
        want = {
            "07c3f51c-79e1-41a5-9bca-634b13d194c0": [
                AthleteIDandRank(
                    athlete_id=UUID("186082d8-50bd-4f21-b6ae-4b6ab6d2d5ac"),
                    ranking=None,
                ),
            ],
            "fdfe05d8-bdd6-4c19-90cd-1ac462a3ec1e": [
                AthleteIDandRank(
                    athlete_id=UUID("835a97a3-7645-434b-8482-d442eeaf58de"),
                    ranking=None,
                ),
                AthleteIDandRank(
                    athlete_id=UUID("6f7d4493-af2a-4f3c-b832-609d966738c8"),
                    ranking=None,
                ),
            ],
        }
        got = assign_paddlers_to_heat(
            paddlers=[
                AthleteIDandRank(
                    athlete_id=UUID("186082d8-50bd-4f21-b6ae-4b6ab6d2d5ac")
                ),
                AthleteIDandRank(
                    athlete_id=UUID("835a97a3-7645-434b-8482-d442eeaf58de")
                ),
                AthleteIDandRank(
                    athlete_id=UUID("6f7d4493-af2a-4f3c-b832-609d966738c8")
                ),
            ],
            heat_ids=[
                "fdfe05d8-bdd6-4c19-90cd-1ac462a3ec1e",
                "07c3f51c-79e1-41a5-9bca-634b13d194c0",
            ],
        )

        assert got == want

    def test_it_adds_paddlers_to_heats_ordered_by_rank_if_random_allocation_is_false(
        self,
    ) -> None:
        random.seed(10)
        want = {
            "fdfe05d8-bdd6-4c19-90cd-1ac462a3ec1e": [
                AthleteIDandRank(
                    athlete_id=UUID("835a97a3-7645-434b-8482-d442eeaf58de"), ranking=4
                ),
                AthleteIDandRank(
                    athlete_id=UUID("6f7d4493-af2a-4f3c-b832-609d966738c7"), ranking=3
                ),
            ],
            "07c3f51c-79e1-41a5-9bca-634b13d194c0": [
                AthleteIDandRank(
                    athlete_id=UUID("6f7d4493-af2a-4f3c-b832-609d966738c8"), ranking=2
                ),
                AthleteIDandRank(
                    athlete_id=UUID("186082d8-50bd-4f21-b6ae-4b6ab6d2d5ac"), ranking=1
                ),
            ],
        }
        got = assign_paddlers_to_heat(
            paddlers=[
                AthleteIDandRank(
                    athlete_id=UUID("186082d8-50bd-4f21-b6ae-4b6ab6d2d5ac"), ranking=1
                ),
                AthleteIDandRank(
                    athlete_id=UUID("835a97a3-7645-434b-8482-d442eeaf58de"), ranking=4
                ),
                AthleteIDandRank(
                    athlete_id=UUID("6f7d4493-af2a-4f3c-b832-609d966738c8"), ranking=2
                ),
                AthleteIDandRank(
                    athlete_id=UUID("6f7d4493-af2a-4f3c-b832-609d966738c7"), ranking=3
                ),
            ],
            heat_ids=[
                "fdfe05d8-bdd6-4c19-90cd-1ac462a3ec1e",
                "07c3f51c-79e1-41a5-9bca-634b13d194c0",
            ],
            random_allocation=False,
        )

        assert got == want

    def test_it_adds_paddlers_to_heats_randomly_with_different_seed(self) -> None:
        random.seed(5)
        want = {
            "07c3f51c-79e1-41a5-9bca-634b13d194c0": [
                AthleteIDandRank(
                    athlete_id=UUID("835a97a3-7645-434b-8482-d442eeaf58de"),
                    ranking=None,
                ),
            ],
            "fdfe05d8-bdd6-4c19-90cd-1ac462a3ec1e": [
                AthleteIDandRank(
                    athlete_id=UUID("186082d8-50bd-4f21-b6ae-4b6ab6d2d5ac"),
                    ranking=None,
                ),
                AthleteIDandRank(
                    athlete_id=UUID("6f7d4493-af2a-4f3c-b832-609d966738c8"),
                    ranking=None,
                ),
            ],
        }
        got = assign_paddlers_to_heat(
            paddlers=[
                AthleteIDandRank(
                    athlete_id=UUID("186082d8-50bd-4f21-b6ae-4b6ab6d2d5ac")
                ),
                AthleteIDandRank(
                    athlete_id=UUID("835a97a3-7645-434b-8482-d442eeaf58de")
                ),
                AthleteIDandRank(
                    athlete_id=UUID("6f7d4493-af2a-4f3c-b832-609d966738c8")
                ),
            ],
            heat_ids=[
                "fdfe05d8-bdd6-4c19-90cd-1ac462a3ec1e",
                "07c3f51c-79e1-41a5-9bca-634b13d194c0",
            ],
        )

        assert got == want


LEVAR = ("Levar", "Burton", "1", "7223c15d-18c1-440c-813c-9358de2844e2")
BRETT = ("Brett", "Spiner", "2", "7486220f-ed09-4e9c-a105-fb448a198cfe")
JONATHAN = ("Jonathan", "Frakes", "2", "db0b0953-1e9b-4ebe-a1dd-5abef970dd2a")
PATRICK = ("Patrick", "Stewart", "2", "addb7085-0c24-4440-a25e-9b73bb111b04")


def athlete(
    who: tuple[str, str, str, str], ranking: int
) -> AthleteScoresWithAthleteInfo:
    first_name, last_name, bib_number, athlete_id = who
    return AthleteScoresWithAthleteInfo(
        first_name=first_name,
        last_name=last_name,
        bib_number=bib_number,
        athlete_id=athlete_id,
        run_scores=[],
        highest_scoring_move=0,
        ranking=ranking,
    )


class TestGetTopNPaddlers:
    @pytest.mark.parametrize(
        ("scores", "want"),
        [
            pytest.param(
                [athlete(LEVAR, 1), athlete(BRETT, 2), athlete(PATRICK, 3)],
                [athlete(LEVAR, 1), athlete(BRETT, 2)],
                id="no_ties",
            ),
            pytest.param(
                [
                    athlete(LEVAR, 1),
                    athlete(BRETT, 2),
                    athlete(JONATHAN, 0),
                    athlete(PATRICK, 3),
                ],
                [athlete(LEVAR, 1), athlete(BRETT, 2)],
                id="rejects_paddlers_with_no_rank",
            ),
            pytest.param(
                [
                    athlete(LEVAR, 1),
                    athlete(BRETT, 2),
                    athlete(JONATHAN, 2),
                    athlete(PATRICK, 3),
                ],
                [athlete(LEVAR, 1), athlete(BRETT, 2), athlete(JONATHAN, 2)],
                id="includes_both_paddlers_in_nth_place_if_tied",
            ),
        ],
    )
    def test_it_returns_the_top_two_paddlers(
        self, scores: list[AthleteScoresWithAthleteInfo], want: list
    ) -> None:
        got = get_top_n_paddlers_for_phase(
            phase_scores=PhaseScoresResponse(
                phase_id="5883532e-0a9e-4f95-ac95-293dfcb36872", scores=scores
            ),
            number_of_paddlers=2,
        )

        assert got == want
