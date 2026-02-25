import os
from collections.abc import Generator
from contextlib import contextmanager
from typing import Any

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker


def get_database_address() -> str:
    """Get database connection string from environment"""
    load_dotenv(".env")
    database_address = os.environ.get("CONNECTION_STRING")
    if not database_address:
        msg = "Database Address cannot be empty"
        raise ValueError(msg)
    return database_address


# Initialize these as None so they can be set up lazily
engine = None
session = None


def setup_database() -> None:
    """Set up database connection"""
    global engine, session
    if engine is None:
        engine = create_engine(get_database_address())
        session = sessionmaker(engine)


def get_transaction_session() -> Generator[Session, Any]:
    """Get a database session for use in a transaction"""
    setup_database()
    try:
        db = session()
        yield db
    finally:
        db.close()


@contextmanager
def transaction_session_context_manager() -> Generator[Session, Any]:
    """Get a database session for use in a transaction using a context manager"""
    yield from get_transaction_session()
