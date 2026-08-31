from uuid import UUID

from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.query_helpers import (
    apply_in_filters,
    apply_ordering,
    apply_pagination,
    apply_range_filters,
)
from app.crud.schemas import RunStatusResponse
from db.client import get_transaction_session
from db.models import RunStatus

run_status_router = APIRouter(prefix="/run_status", tags=["run_status"])


@run_status_router.get("/")
async def get_many(
    db: Session = Depends(get_transaction_session),
    id____list: list[UUID] | None = Query(None, alias="id____list"),
    id____list_____comparison_operator: str | None = Query(
        None, alias="id____list_____comparison_operator"
    ),
    heat_id____list: list[UUID] | None = Query(None, alias="heat_id____list"),
    heat_id____list_____comparison_operator: str | None = Query(
        None, alias="heat_id____list_____comparison_operator"
    ),
    run_number____from: int | None = Query(None, alias="run_number____from"),
    run_number____to: int | None = Query(None, alias="run_number____to"),
    run_number____list: list[int] | None = Query(None, alias="run_number____list"),
    run_number____list_____comparison_operator: str | None = Query(
        None, alias="run_number____list_____comparison_operator"
    ),
    phase_id____list: list[UUID] | None = Query(None, alias="phase_id____list"),
    phase_id____list_____comparison_operator: str | None = Query(
        None, alias="phase_id____list_____comparison_operator"
    ),
    athlete_id____list: list[UUID] | None = Query(None, alias="athlete_id____list"),
    athlete_id____list_____comparison_operator: str | None = Query(
        None, alias="athlete_id____list_____comparison_operator"
    ),
    locked____list: list[bool] | None = Query(None, alias="locked____list"),
    locked____list_____comparison_operator: str | None = Query(
        None, alias="locked____list_____comparison_operator"
    ),
    did_not_start____list: list[bool] | None = Query(
        None, alias="did_not_start____list"
    ),
    did_not_start____list_____comparison_operator: str | None = Query(
        None, alias="did_not_start____list_____comparison_operator"
    ),
    limit: int | None = Query(None),
    offset: int | None = Query(None),
    order_by_columns: list[str] | None = Query(None),
) -> list[RunStatusResponse]:
    """Get many run statuses"""
    query = select(RunStatus)

    query = apply_in_filters(
        query,
        [
            (RunStatus.id, id____list),
            (RunStatus.heat_id, heat_id____list),
            (RunStatus.run_number, run_number____list),
            (RunStatus.phase_id, phase_id____list),
            (RunStatus.athlete_id, athlete_id____list),
        ],
    )
    query = apply_range_filters(
        query,
        [(RunStatus.run_number, run_number____from, run_number____to)],
    )

    # Boolean list filters apply even when empty, so keep the explicit None check.
    if locked____list is not None:
        query = query.where(RunStatus.locked.in_(locked____list))
    if did_not_start____list is not None:
        query = query.where(RunStatus.did_not_start.in_(did_not_start____list))

    query = apply_ordering(
        query,
        order_by_columns,
        {
            "run_number": RunStatus.run_number,
            "locked": RunStatus.locked,
            "did_not_start": RunStatus.did_not_start,
        },
    )
    query = apply_pagination(query, limit, offset)

    result = db.execute(query)
    run_statuses = result.scalars().all()

    return [RunStatusResponse.model_validate(status) for status in run_statuses]
