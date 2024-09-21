import os
from collections.abc import Generator
from typing import Any

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

load_dotenv(".env")

database_address = os.environ.get("CONNECTION_STRING")
if not database_address:
    msg = "Database Address cannot be empty"
    raise ValueError(msg)
engine = create_engine(database_address)
session = sessionmaker(engine)


def get_transaction_session() -> Generator[Session, Any, None]:
    try:
        db = session()
        yield db
    finally:
        db.close()
