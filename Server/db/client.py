import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import SingletonThreadPool

load_dotenv(".env")

database_address = os.environ.get("CONNECTION_STRING")
engine = create_engine(database_address, poolclass=SingletonThreadPool)
session = sessionmaker(engine)


def get_transaction_session():
    try:
        db = session()
        yield db
    finally:
        db.close()
