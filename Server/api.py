import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.autogenEndpoints import (
    crud_route_athlete,
    crud_route_athleteheat,
    crud_route_availablebonuses,
    crud_route_availablemoves,
    crud_route_competition,
    crud_route_event,
    crud_route_heat,
    crud_route_phase,
    crud_route_scoredbonuses,
    crud_route_scoredmoves,
    crud_route_scoresheet,
)
from app.competition_management.competition_management import (
    competition_management_router,
)
from app.competition_management.pdfEndpoints import pdf_router
from app.scoresheetEndpoints import scoresheet_router
from app.scoring.customScoringEndpoints import scoring_router

frontend_url = "http://localhost:3000"
request_origins = [frontend_url]

app = FastAPI()
[
    app.include_router(i)
    for i in [
        competition_management_router,
        scoring_router,
        scoresheet_router,
        pdf_router,
        crud_route_competition,
        crud_route_event,
        crud_route_phase,
        crud_route_heat,
        crud_route_athlete,
        crud_route_scoresheet,
        crud_route_availablemoves,
        crud_route_availablebonuses,
        crud_route_scoredmoves,
        crud_route_scoredbonuses,
        crud_route_athleteheat,
    ]
]


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "Go to /docs to see the swagger documentation"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=request_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def run_server() -> None:
    config = uvicorn.Config(app, host="0.0.0.0", port=8001)
    server = uvicorn.Server(config)
    await server.serve()
