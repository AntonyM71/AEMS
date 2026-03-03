import os
import time
import uuid
from collections.abc import Awaitable, Callable

import structlog
import uvicorn
from fastapi import Depends, FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import TypeAdapter
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from sqlalchemy.sql import text

from app.broadcastEndpoints import broadcast_router
from app.competition_management.competition_management import (
    competition_management_router,
)
from app.competition_management.pdfEndpoints import pdf_router
from app.crud.athlete import athlete_router
from app.crud.athleteheat import athleteheat_router
from app.crud.availablebonuses import availablebonuses_router
from app.crud.availablemoves import availablemoves_router
from app.crud.competition import competition_router
from app.crud.event import event_router
from app.crud.heat import heat_router
from app.crud.phase import phase_router
from app.crud.run_status import run_status_router
from app.crud.scoredmoves import scoredmoves_router
from app.crud.scoresheet import scoresheet_router as scoresheet_crud_router
from app.scoresheetEndpoints import scoresheet_router
from app.scoring.customScoringEndpoints import scoring_router
from custom_logging import setup_logging
from db.client import get_transaction_session

frontend_url = f"http://localhost:{os.getenv('PORT', default=3000)}"
request_origins = [frontend_url]


LOG_JSON_FORMAT = TypeAdapter(bool).validate_python(os.getenv("LOG_JSON_FORMAT", default=False))
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
setup_logging(json_logs=LOG_JSON_FORMAT, log_level=LOG_LEVEL, log_name="server")

access_logger = structlog.stdlib.get_logger("api.access")


app = FastAPI()
[
    app.include_router(i)
    for i in [
        competition_management_router,
        scoring_router,
        scoresheet_router,
        pdf_router,
        broadcast_router,
        competition_router,
        event_router,
        phase_router,
        heat_router,
        athlete_router,
        scoresheet_crud_router,
        availablemoves_router,
        availablebonuses_router,
        scoredmoves_router,
        athleteheat_router,
        run_status_router,
    ]
]


@app.exception_handler(Exception)
async def validation_exception_handler(
    request: Request, exc: Exception
) -> JSONResponse:
    # Change here to Logger
    return JSONResponse(
        status_code=500,
        content={
            "message": (
                f"Failed method {request.method} at URL {request.url}."
                f" Exception message is {exc!r}."
            )
        },
    )


@app.middleware("http")
async def logging_middleware(
    request: Request, call_next: Callable[[Request], Awaitable[Response]]
) -> Response:
    structlog.contextvars.clear_contextvars()
    # These context vars will be added to all log entries emitted during the request
    request_id = str(uuid.uuid4())
    structlog.contextvars.bind_contextvars(request_id=request_id)

    start_time = time.perf_counter_ns()
    # If the call_next raises an error, we still want to return our own 500 response,
    # so we can add headers to it (process time, request ID...)
    response = Response(status_code=500)
    try:
        response = await call_next(request)
    except Exception:
        structlog.stdlib.get_logger("api.error").exception("Uncaught exception")
        raise
    finally:
        process_time = time.perf_counter_ns() - start_time
        status_code = response.status_code
        url = request.base_url
        client_host = request.client.host
        client_port = request.client.port
        http_method = request.method
        http_version = request.scope["http_version"]
        # Recreate the Uvicorn access log format, but add all parameters as structured information
        msg = f"""{client_host}:{client_port} - "{http_method} {url} HTTP/{http_version}" {status_code}"""
        access_logger.info(
            msg,
            http={
                "url": str(request.url),
                "status_code": status_code,
                "method": http_method,
                "version": http_version,
                "duration": process_time,
            },
            network={"client": {"ip": client_host, "port": client_port}},
        )
        response.headers["X-Process-Time"] = str(process_time / 10**9)
        return response  # noqa: B012


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "Go to /docs to see the swagger documentation"}


@app.get("/health", tags=["health"])
async def health_check(db: Session = Depends(get_transaction_session)) -> dict:
    try:
        # Execute a simple query to check the database connection
        result = db.execute(text("SELECT 1"))
        if result.scalar() == 1:
            return {"status": "healthy"}
    except SQLAlchemyError:
        return {"status": "unhealthy"}
    # Ensure a default return value in case of unexpected issues
    return {"status": "unknown"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=request_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def run_server() -> None:
    config = uvicorn.Config(app, host="0.0.0.0", port=8000, log_config=None)
    server = uvicorn.Server(config)
    await server.serve()
