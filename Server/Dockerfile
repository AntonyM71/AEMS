#
FROM python:3.10

ENV LOG_JSON_FORMAT true
ENV DD_TRACE_ENABLED true
ENV UVICORN_PORT 8000
ENV PORT 3000
ENV UV_COMPILE_BYTECODE=1
ENV UV_PROJECT_ENVIRONMENT=/usr/local
#

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
WORKDIR /code

#
COPY ./ /code/
#
RUN uv sync --frozen

#

WORKDIR /code/
#
CMD ["bash", "-c", "alembic upgrade head && python -m scripts.seed_scoresheets && gunicorn -w 8 -k uvicorn.workers.UvicornWorker --timeout 120 main:app -b 0.0.0.0:8000"]