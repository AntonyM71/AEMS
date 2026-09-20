"""Direct unit tests for the shared query-builder helpers in query_helpers.py.

These exercise apply_in_filters/apply_range_filters/apply_ordering/apply_pagination
against a minimal in-memory table, independent of any specific CRUD endpoint.
"""

from collections.abc import Generator
from typing import Any

import pytest
from sqlalchemy import Column, Integer, MetaData, String, Table, create_engine, select
from sqlalchemy.engine import Connection

from app.crud.query_helpers import (
    apply_in_filters,
    apply_ordering,
    apply_pagination,
    apply_range_filters,
)

metadata = MetaData()
widgets = Table(
    "widgets",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String),
    Column("score", Integer),
)


@pytest.fixture
def conn() -> Generator[Connection]:
    engine = create_engine("sqlite:///:memory:")
    metadata.create_all(engine)
    with engine.connect() as connection:
        connection.execute(
            widgets.insert(),
            [
                {"id": 1, "name": "alpha", "score": 0},
                {"id": 2, "name": "bravo", "score": 5},
                {"id": 3, "name": "charlie", "score": 10},
            ],
        )
        connection.commit()
        yield connection
    engine.dispose()


def names(conn: Connection, query: select) -> list[str]:
    return [row.name for row in conn.execute(query)]


@pytest.mark.parametrize(
    ("filters", "expected"),
    [
        ([(widgets.c.id, [1, 3])], ["alpha", "charlie"]),
        ([(widgets.c.id, [])], ["alpha", "bravo", "charlie"]),
        (
            [(widgets.c.id, [1, 2]), (widgets.c.name, ["bravo"])],
            ["bravo"],
        ),
    ],
    ids=["matches_given_values", "skips_empty_values", "combines_with_and"],
)
def test_apply_in_filters(conn: Connection, filters: Any, expected: list[str]) -> None:
    query = apply_in_filters(select(widgets), filters)
    assert names(conn, query) == expected


@pytest.mark.parametrize(
    ("low", "high", "expected"),
    [
        (1, 9, ["bravo"]),
        (None, None, ["alpha", "bravo", "charlie"]),
        (0, 0, ["alpha"]),
    ],
    ids=["applies_low_and_high", "skips_none_bounds", "zero_is_a_real_bound"],
)
def test_apply_range_filters(
    conn: Connection, low: int | None, high: int | None, expected: list[str]
) -> None:
    query = apply_range_filters(select(widgets), [(widgets.c.score, low, high)])
    assert names(conn, query) == expected


@pytest.mark.parametrize(
    ("order_by_columns", "expected"),
    [
        (["score"], ["alpha", "bravo", "charlie"]),
        (["score_desc"], ["charlie", "bravo", "alpha"]),
    ],
    ids=["ascending_on_substring_match", "descending_when_desc_in_string"],
)
def test_apply_ordering_direction(
    conn: Connection, order_by_columns: list[str], expected: list[str]
) -> None:
    query = apply_ordering(
        select(widgets), order_by_columns, {"score": widgets.c.score}
    )
    assert names(conn, query) == expected


def test_apply_ordering_first_matching_sortable_key_wins(conn: Connection) -> None:
    query = apply_ordering(
        select(widgets),
        ["name_score_desc"],
        {"score": widgets.c.score, "name": widgets.c.name},
    )
    assert names(conn, query) == ["charlie", "bravo", "alpha"]


def test_apply_ordering_uses_default_when_nothing_requested(conn: Connection) -> None:
    query = apply_ordering(
        select(widgets),
        None,
        {"score": widgets.c.score},
        default=(widgets.c.score.desc(),),
    )
    assert names(conn, query) == ["charlie", "bravo", "alpha"]


def test_apply_ordering_unmatched_column_leaves_query_unordered(
    conn: Connection,
) -> None:
    query = apply_ordering(select(widgets), ["unknown"], {"score": widgets.c.score})
    assert "ORDER BY" not in str(query)


@pytest.mark.parametrize(
    ("limit", "offset", "expected"),
    [
        (1, 1, ["bravo"]),
        (None, None, ["alpha", "bravo", "charlie"]),
        (0, None, []),
    ],
    ids=[
        "applies_limit_and_offset",
        "none_returns_everything",
        "zero_limit_is_a_real_bound",
    ],
)
def test_apply_pagination(
    conn: Connection, limit: int | None, offset: int | None, expected: list[str]
) -> None:
    query = apply_pagination(
        select(widgets).order_by(widgets.c.id), limit=limit, offset=offset
    )
    assert names(conn, query) == expected
