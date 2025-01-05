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
CMD ["ddtrace-run","uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]