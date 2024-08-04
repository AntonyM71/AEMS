
import codecs
import csv

from fastapi import APIRouter, UploadFile

competition_management_router = APIRouter(prefix="/competition_management")


def upload_competiton_from_csv(competition_name: str, file: UploadFile) -> list:
    csv_reader = csv.DictReader(codecs.iterdecode(file.file, 'utf-8'))
    data = []
    for rows in csv_reader:
        print(rows)
        data.append(rows)

    data.append(competition_name)
    file.file.close()
    return data
