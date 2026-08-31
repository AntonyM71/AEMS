"""Query-builder helpers shared by the CRUD list endpoints.

Each ``get_many`` handler stays flat by describing *what* to filter, order and
paginate by; the repetitive mechanics of translating that into SQLAlchemy live
here.
"""

from collections.abc import Sequence
from typing import Any

from sqlalchemy.sql import ColumnElement, Select


def apply_in_filters(
    query: Select[Any],
    filters: Sequence[tuple[ColumnElement[Any], Any]],
) -> Select[Any]:
    """Add ``column IN (values)`` for every pair whose ``values`` is truthy."""
    for column, values in filters:
        if values:
            query = query.where(column.in_(values))
    return query


def apply_range_filters(
    query: Select[Any],
    bounds: Sequence[tuple[ColumnElement[Any], Any, Any]],
) -> Select[Any]:
    """Add ``>= low`` and/or ``<= high`` for every ``(column, low, high)`` triple.

    A bound of ``None`` is skipped, so ``0`` is still applied.
    """
    for column, low, high in bounds:
        if low is not None:
            query = query.where(column >= low)
        if high is not None:
            query = query.where(column <= high)
    return query


def apply_ordering(
    query: Select[Any],
    order_by_columns: list[str] | None,
    sortable: dict[str, ColumnElement[Any]],
    *,
    default: Sequence[ColumnElement[Any]] = (),
) -> Select[Any]:
    """Order by each requested string that substring-matches a ``sortable`` key.

    The first matching key (in ``sortable`` insertion order) wins per request
    string, and ``desc`` anywhere in that string selects descending order. When
    no ordering is requested at all, ``default`` is applied if provided; a
    request that matches nothing leaves the query unordered.
    """
    if not order_by_columns:
        return query.order_by(*default) if default else query
    for order_col in order_by_columns:
        lowered = order_col.lower()
        for key, column in sortable.items():
            if key in lowered:
                direction = column.desc() if "desc" in lowered else column.asc()
                query = query.order_by(direction)
                break
    return query


def apply_pagination(
    query: Select[Any], limit: int | None, offset: int | None
) -> Select[Any]:
    """Apply ``offset`` then ``limit`` when each is not ``None``."""
    if offset is not None:
        query = query.offset(offset)
    if limit is not None:
        query = query.limit(limit)
    return query
