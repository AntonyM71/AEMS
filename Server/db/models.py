from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Competition(Base):
    __tablename__ = "competition"
    id = Column(UUID(), primary_key=True, comment="Competition ID")
    name = Column(String)
    users = ARRAY(String)
    events = relationship("Event")


class Event(Base):
    __tablename__ = "event"
    id = Column(UUID(), primary_key=True)
    competition_id = Column(
        UUID(),
        ForeignKey("competition.id"), nullable=False
    )
    competition = relationship("Competition", back_populates="events")
    phases = relationship("Phase", back_populates="event")
    name = Column(String)


class Phase(Base):
    __tablename__ = "phase"
    id = Column(UUID(), primary_key=True)
    event_id = Column(
        UUID(),
        ForeignKey("event.id"),
    )
    event = relationship("Event", back_populates="phases")
    heats = relationship("Heat", back_populates="phase")
    name = Column(String)
    number_of_runs = Column(Integer)


class Heat(Base):
    __tablename__ = "heat"
    id = Column(UUID(), primary_key=True)
    phase_id = Column(
        UUID(),
        ForeignKey("phase.id"),
    )
    phase = relationship("Phase", back_populates="heats")
    runs = relationship("Run", back_populates="heat")
    name = Column(String)


class Run(Base):
    __tablename__ = "run"
    id = Column(UUID(), primary_key=True)
    heat_id = Column(
        UUID(),
        ForeignKey("heat.id"),
    )
    heat = relationship("Heat", back_populates="runs")
    name = Column(String)

    # paddlers = relationship("Athlete", foreign_keys=[paddler_ids])


class Athlete(Base):
    __tablename__ = "athlete"
    id = Column(UUID(), primary_key=True)

    first_name = Column(String)
    last_name = Column(String)


class ScoreSheet(Base):
    __tablename__ = "scoreSheet"
    id = Column(UUID(), primary_key=True, comment="Competition ID")
    name = Column(String)


class AvailableMoves(Base):
    __tablename__ = "availableMoves"
    id = Column(UUID(), primary_key=True)
    sheet_id = Column(
        UUID(),
        ForeignKey("scoreSheet.id"),
    )
    # run = relationship("ScoreSheet", foreign_keys=[sheet_id])
    name = Column(String)
    score = Column(Integer)


class AvailableBonuses(Base):
    __tablename__ = "availableBonuses"
    id = Column(UUID(), primary_key=True)
    sheet_id = Column(
        UUID(),
        ForeignKey("scoreSheet.id"),
    )
    move_id = Column(
        UUID(),
        ForeignKey("availableMoves.id"),
    )
    run = relationship("ScoreSheet", foreign_keys=[sheet_id])
    move = relationship("AvailableMoves", foreign_keys=[move_id])
    name = Column(String)
    score = Column(Integer)


class ScoredMoves(Base):
    __tablename__ = "scoredMoves"
    id = Column(UUID(), primary_key=True, comment="Competition ID")
    move_id = Column(UUID(), ForeignKey("availableMoves.id"))
    run_id = Column(UUID(), ForeignKey("run.id"))
    run = relationship("Run", foreign_keys=[run_id])
    move = relationship("AvailableMoves", foreign_keys=[move_id])
    judge_id = Column(String)


class ScoredBonuses(Base):
    __tablename__ = "scoredBonuses"
    id = Column(UUID(), primary_key=True, comment="Competition ID")
    bonus_id = Column(UUID(), ForeignKey("availableBonuses.id"))
    move_id = Column(UUID(), ForeignKey("scoredMoves.id"))
    bonus = relationship("AvailableBonuses", foreign_keys=[bonus_id])
    move = relationship("ScoredMoves", foreign_keys=[move_id])
    judge_id = Column(String)
