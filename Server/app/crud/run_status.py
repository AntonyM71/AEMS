from uuid import UUID

from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.schemas import RunStatusResponse
from db.client import get_transaction_session
from db.models import RunStatus

run_status_router = APIRouter(prefix="/run_status", tags=["run_status"])


@run_status_router.get("/", response_model=list[RunStatusResponse])
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

    # Apply filters
    if id____list:
        query = query.where(RunStatus.id.in_(id____list))

    if heat_id____list:
        query = query.where(RunStatus.heat_id.in_(heat_id____list))

    if run_number____from is not None:
        query = query.where(RunStatus.run_number >= run_number____from)
    if run_number____to is not None:
        query = query.where(RunStatus.run_number <= run_number____to)
    if run_number____list:
        query = query.where(RunStatus.run_number.in_(run_number____list))

    if phase_id____list:
        query = query.where(RunStatus.phase_id.in_(phase_id____list))

    if athlete_id____list:
        query = query.where(RunStatus.athlete_id.in_(athlete_id____list))

    if locked____list is not None:
        query = query.where(RunStatus.locked.in_(locked____list))

    if did_not_start____list is not None:
        query = query.where(RunStatus.did_not_start.in_(did_not_start____list))

    # Apply ordering
    if order_by_columns:
        for order_col in order_by_columns:
            if "run_number" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(RunStatus.run_number.desc())
                else:
                    query = query.order_by(RunStatus.run_number.asc())
            elif "locked" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(RunStatus.locked.desc())
                else:
                    query = query.order_by(RunStatus.locked.asc())
            elif "did_not_start" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(RunStatus.did_not_start.desc())
                else:
                    query = query.order_by(RunStatus.did_not_start.asc())

    # Apply pagination
    if offset is not None:
        query = query.offset(offset)
    if limit is not None:
        query = query.limit(limit)

    result = db.execute(query)
    run_statuses = result.scalars().all()

    return [RunStatusResponse.model_validate(status) for status in run_statuses]
