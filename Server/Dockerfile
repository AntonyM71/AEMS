#
FROM python:3.10

ENV LOG_JSON_FORMAT true
ENV DD_TRACE_ENABLED true
#
WORKDIR /code

#
COPY ./ /code/
#
RUN pip install --no-cache-dir --upgrade .

#

WORKDIR /code/
#
CMD ["LOG_JSON_FORMAT=true", "DD_TRACE_ENABLED=true", "ddtrace-run","uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]