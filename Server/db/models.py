from sqlalchemy import Column, DateTime, Integer, String, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Bug(Base):
    __tablename__ = 'bug'
    id = Column(Integer, primary_key=True)
    bug_tracker_url = Column(String, unique=True)
    root_cause = Column(String)
    who = Column(String)
    when = Column(DateTime, default=func.now())

    def __repr__(self):
        return 'id: {}, root cause: {}'.format(self.id, self.root_cause)
