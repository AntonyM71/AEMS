from app.competition_management.competition_management import assign_paddlers_to_heat


class TestCompetitionManagement:
    def test_it_returns_an_empty_dict_with_no_heats_or_paddlers(self) -> None:
        want = {}
        got = assign_paddlers_to_heat(paddlers=[], heat_ids=[])

        assert got == want

    def test_it_makes_an_empty_heat_if_no_paddlers_are_provided(self) -> None:
        want = {"fdfe05d8-bdd6-4c19-90cd-1ac462a3ec1e": []}
        got = assign_paddlers_to_heat(
            paddlers=[], heat_ids=["fdfe05d8-bdd6-4c19-90cd-1ac462a3ec1e"])

        assert got == want

    def test_it_adds_paddlers_to_heats_randomly(self) -> None:
        want = {"fdfe05d8-bdd6-4c19-90cd-1ac462a3ec1e": [],
                "07c3f51c-79e1-41a5-9bca-634b13d194c0": []}
        got = assign_paddlers_to_heat(
            paddlers=[], heat_ids=["fdfe05d8-bdd6-4c19-90cd-1ac462a3ec1e", "07c3f51c-79e1-41a5-9bca-634b13d194c0"])

        assert got == want
