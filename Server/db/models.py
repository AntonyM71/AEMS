import uuid

from sqlalchemy import Column, DateTime, String, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils.types import uuid as SQLAUUID

Base = declarative_base()


class Bug(Base):
    __tablename__ = 'bug'
    id = Column(SQLAUUID.uuid, primary_key=True, default=uuid.uuid4())
    bug_tracker_url = Column(String, unique=True)
    root_cause = Column(String)
    who = Column(String)
    when = Column(DateTime, default=func.now())
