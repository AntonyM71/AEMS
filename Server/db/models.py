from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Competition(Base):
    __tablename__ = "Competition"
    id = Column(UUID(), primary_key=True, comment="Competition ID")
    name = Column(String)
    users = ARRAY(String)


class Event(Base):
    __tablename__ = "Event"
    id = Column(UUID(), primary_key=True)
    competition_id = Column(
        UUID(),
        ForeignKey("Competition.id"),
    )
    # competition = relationship("Competition", foreign_keys=[competition_id])
    name = Column(String)


class Phase(Base):
    __tablename__ = "Phase"
    id = Column(UUID(), primary_key=True)
    event_id = Column(
        UUID(),
        ForeignKey("Event.id"),
    )
    # event = relationship("Event", foreign_keys=[event_id])
    name = Column(String)
    number_of_runs = Column(Integer)


class Heat(Base):
    __tablename__ = "Heat"
    id = Column(UUID(), primary_key=True)
    phase_id = Column(
        UUID(),
        ForeignKey("Phase.id"),
    )
    # phase = relationship("Phase", foreign_keys=[phase_id])
    name = Column(String)


class Run(Base):
    __tablename__ = "Run"
    id = Column(UUID(), primary_key=True)
    heat_id = Column(
        UUID(),
        ForeignKey("Heat.id"),
    )
    run = relationship("Heat", foreign_keys=[heat_id])
    name = Column(String)
    paddler_ids = Column(
        ARRAY(
            UUID(),
        )
    )
    # paddlers = relationship("Athlete", foreign_keys=[paddler_ids])


class Athlete(Base):
    __tablename__ = "Athlete"
    id = Column(UUID(), primary_key=True)

    first_name = Column(String)
    last_name = Column(String)


class ScoreSheet(Base):
    __tablename__ = "ScoreSheet"
    id = Column(UUID(), primary_key=True, comment="Competition ID")
    name = Column(String)


class AvailableMoves(Base):
    __tablename__ = "AvailableMoves"
    id = Column(UUID(), primary_key=True)
    sheet_id = Column(
        UUID(),
        ForeignKey("ScoreSheet.id"),
    )
    # run = relationship("ScoreSheet", foreign_keys=[sheet_id])
    name = Column(String)
    score = Column(Integer)


class AvailableBonuses(Base):
    __tablename__ = "AvailableBonuses"
    id = Column(UUID(), primary_key=True)
    sheet_id = Column(
        UUID(),
        ForeignKey("ScoreSheet.id"),
    )
    move_id = Column(
        UUID(),
        ForeignKey("AvailableMoves.id"),
    )
    run = relationship("ScoreSheet", foreign_keys=[sheet_id])
    move = relationship("AvailableMoves", foreign_keys=[move_id])
    name = Column(String)
    score = Column(Integer)


class ScoredMoves(Base):
    __tablename__ = "ScoredMoves"
    id = Column(UUID(), primary_key=True, comment="Competition ID")
    move_id = Column(UUID(), ForeignKey("AvailableMoves.id"))
    run_id = Column(UUID(), ForeignKey("Run.id"))
    run = relationship("Run", foreign_keys=[run_id])
    move = relationship("AvailableMoves", foreign_keys=[move_id])
    judge_id = Column(String)


class ScoredBonuses(Base):
    __tablename__ = "ScoredBonuses"
    id = Column(UUID(), primary_key=True, comment="Competition ID")
    bonus_id = Column(UUID(), ForeignKey("AvailableBonuses.id"))
    move_id = Column(UUID(), ForeignKey("ScoredMoves.id"))
    bonus = relationship("AvailableBonuses", foreign_keys=[bonus_id])
    move = relationship("ScoredMoves", foreign_keys=[move_id])
    judge_id = Column(String)
