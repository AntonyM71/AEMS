

from fastapi import APIRouter


competition_management_router = APIRouter("competition_management")


@competition_management_router.get("/heat_pdf", status_code=status.HTTP_200_OK)
async def heat_pdf(
    heat_ids: list[str] = Query(None),
    db: Session = Depends(get_transaction_session),
) -> Response:
