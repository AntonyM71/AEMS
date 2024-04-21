
import codecs
import csv

from fastapi import APIRouter, File, Form, UploadFile

ingest_router = APIRouter()


@ingest_router.post("/upload")
def upload( competition_name: str = Form(...),file: UploadFile = File(...)) -> list:
    csv_reader = csv.DictReader(codecs.iterdecode(file.file, 'utf-8'))
    data = []
    for rows in csv_reader:
        print(rows)
        data.append(rows)

    data.append(competition_name)
    file.file.close()
    return data