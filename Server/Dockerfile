#
FROM python:3.10

#
WORKDIR /code

#
COPY ./ /code/
#
RUN pip install --no-cache-dir --upgrade .

#

WORKDIR /code/
#
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]