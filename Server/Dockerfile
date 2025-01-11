#
FROM python:3.10

ENV LOG_JSON_FORMAT true
ENV DD_TRACE_ENABLED true
ENV UVICORN_PORT 8000
ENV PORT 3000
#
WORKDIR /code

#
COPY ./ /code/
#
RUN pip install --no-cache-dir --upgrade .

#

WORKDIR /code/
#
CMD ["bash", "-c", "alembic upgrade head && python -m scripts.seed_scoresheets && gunicorn -w 8 -k uvicorn.workers.UvicornWorker --timeout 120 main:app -b 0.0.0.0:8000"]