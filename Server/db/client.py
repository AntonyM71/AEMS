from collections.abc import Generator
from contextlib import contextmanager
from typing import Any

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.config import settings

# Initialize these as None so they can be set up lazily
engine = None
session = None


def setup_database() -> None:
    """Set up database connection"""
    global engine, session
    if engine is None:
        engine = create_engine(settings.connection_string)
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
