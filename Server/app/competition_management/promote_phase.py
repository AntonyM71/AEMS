from fastapi import Depends, Query, Response
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from db.client import get_transaction_session


@competition_management_router.get("/heat_pdf", status_code=status.HTTP_200_OK)
async def heat_pdf(
    heat_ids: list[str] = Query(None),
    db: Session = Depends(get_transaction_session),
) -> Response:
