"""Helpers for testing models with UUID compatibility."""
import uuid
from contextlib import contextmanager

from sqlalchemy import Column, String, create_engine, event
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Create a new declarative base for testing
TestBase = declarative_base()


# Custom UUID type for SQLite compatibility
class SqliteUUID(String):
    """String type that acts as PostgreSQL UUID for SQLite."""

    def __init__(self, as_uuid=False):
        super().__init__(36)
        self.as_uuid = as_uuid


# Define a function to create test models with SQLite compatible UUIDs
def create_test_models():
    """Create test versions of the models with SQLite compatible UUIDs."""
    # Define test models with String instead of UUID
    class TestCompetition(TestBase):
        __tablename__ = "competition"
        id = Column(
            SqliteUUID(),
            primary_key=True,
            nullable=False,
            unique=True
        )
        name = Column(String, nullable=False)
        schema = "public"

    class TestEvent(TestBase):
        __tablename__ = "event"
        id = Column(
            SqliteUUID(),
            primary_key=True,
            nullable=False,
            unique=True
        )
        competition_id = Column(
            SqliteUUID(),
            nullable=False
        )
        name = Column(String, nullable=False)
        schema = "public"

    class TestPhase(TestBase):
        __tablename__ = "phase"
        id = Column(
            SqliteUUID(),
            primary_key=True,
            nullable=False,
            unique=True
        )
        event_id = Column(SqliteUUID(), nullable=False)
        name = Column(String, nullable=False)
        number_of_runs = Column(String, nullable=False, default=3)
        number_of_runs_for_score = Column(String, nullable=False, default=2)
        number_of_judges = Column(String, nullable=False, default=3)
        scoresheet = Column(SqliteUUID(), nullable=False)
        schema = "public"

    class TestHeat(TestBase):
        __tablename__ = "heat"
        id = Column(
            SqliteUUID(),
            primary_key=True,
            nullable=False,
            unique=True
        )
        competition_id = Column(
            SqliteUUID(),
            nullable=False
        )
        name = Column(String, nullable=False)
        schema = "public"

    class TestAthlete(TestBase):
        __tablename__ = "athlete"
        id = Column(
            SqliteUUID(),
            primary_key=True,
            nullable=False,
            unique=True
        )
        first_name = Column(String, nullable=False)
        last_name = Column(String, nullable=False)
        affiliation = Column(String, nullable=True)
        bib = Column(String, nullable=False)
        schema = "public"

    class TestScoreSheet(TestBase):
        __tablename__ = "scoreSheet"
        id = Column(
            SqliteUUID(),
            primary_key=True,
            nullable=False,
            unique=True
        )
        name = Column(String, nullable=False)
        schema = "public"

    return {
        "Competition": TestCompetition,
        "Event": TestEvent,
        "Phase": TestPhase,
        "Heat": TestHeat,
        "Athlete": TestAthlete,
        "ScoreSheet": TestScoreSheet,
    }


@contextmanager
def create_test_db_session():
    """Create an in-memory SQLite database session with UUID support."""
    # Create an in-memory SQLite database
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
    )

    # Add UUID function to SQLite
    @event.listens_for(engine, "connect")
    def do_connect(dbapi_connection, connection_record):
        # Define gen_random_uuid function for SQLite
        dbapi_connection.create_function(
            "gen_random_uuid", 0, lambda: str(uuid.uuid4()))

    # Create all test tables
    TestBase.metadata.create_all(engine)

    # Create test session
    TestSessionLocal = sessionmaker(bind=engine)
    db = TestSessionLocal()

    try:
        yield db
    finally:
        db.close()
        TestBase.metadata.drop_all(engine)


def create_test_uuid():
    """Create a test UUID string."""
    return str(uuid.uuid4())
