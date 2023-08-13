from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Competition(Base):
    __tablename__ = "competition"
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    users = ARRAY(String)
    events = relationship("Event")
    schema = "public"


class Event(Base):
    __tablename__ = "event"
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False)
    competition_id = Column(
        UUID(as_uuid=True), ForeignKey("competition.id"), nullable=False
    )
    competition = relationship("Competition", back_populates="events")
    phases = relationship("Phase", back_populates="event")
    name = Column(String, nullable=False)
    schema = "public"


class Phase(Base):
    __tablename__ = "phase"
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False)
    event_id = Column(UUID(as_uuid=True), ForeignKey("event.id"), nullable=False)
    event = relationship("Event", back_populates="phases")
    heats = relationship("Heat", back_populates="phase")
    name = Column(String, nullable=False)
    number_of_runs = Column(Integer, nullable=False)
    schema = "public"


class Heat(Base):
    __tablename__ = "heat"
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False)
    phase_id = Column(UUID(as_uuid=True), ForeignKey("phase.id"), nullable=False)
    phase = relationship("Phase", back_populates="heats")

    name = Column(String, nullable=False)
    schema = "public"
    athletes = relationship("AthleteHeat", back_populates="heats")


class AthleteHeat(Base):
    __tablename__ = "athleteheat"
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False)
    heat_id = Column(UUID(as_uuid=True), ForeignKey("heat.id"), nullable=False)
    athlete_id = Column(UUID(as_uuid=True), ForeignKey("athlete.id"), nullable=False)
    scoresheet = Column(UUID(as_uuid=True), ForeignKey("scoreSheet.id"), nullable=False)
    heats = relationship("Heat", back_populates="athletes")
    athletes = relationship("Athlete", back_populates="heats")


# class Run(Base):
#     __tablename__ = "run"
#     id = Column(UUID(as_uuid=True), primary_key=True)
#     heat_id = Column(UUID(as_uuid=True), ForeignKey("heat.id"), nullable=False)
#     heat = relationship("Heat", back_populates="runs")
#     name = Column(String, nullable=False)
#     schema = "public"


class Athlete(Base):
    __tablename__ = "athlete"
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False)
    heats = relationship("AthleteHeat", back_populates="athletes")

    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    bib = Column(String, nullable=False)
    schema = "public"


class ScoreSheet(Base):
    __tablename__ = "scoreSheet"
    id = Column(UUID(as_uuid=True), primary_key=True, comment="Competition ID")
    name = Column(String, nullable=False)
    # athletes = relationship("Athlete", back_populates="scoresheet_id")
    schema = "public"


class AvailableMoves(Base):
    __tablename__ = "availableMoves"
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False)
    sheet_id = Column(UUID(as_uuid=True), ForeignKey("scoreSheet.id"), nullable=False)
    # run = relationship("ScoreSheet", foreign_keys=[sheet_id])
    name = Column(String, nullable=False)
    fl_score = Column(Integer, nullable=False)
    rb_score = Column(Integer, nullable=False)
    schema = "public"
    direction = Column(String, nullable=False)


class AvailableBonuses(Base):
    __tablename__ = "availableBonuses"
    id = Column(UUID(as_uuid=True), primary_key=True)
    sheet_id = Column(UUID(as_uuid=True), ForeignKey("scoreSheet.id"), nullable=False)
    move_id = Column(
        UUID(as_uuid=True), ForeignKey("availableMoves.id"), nullable=False
    )
    sheet = relationship("ScoreSheet", foreign_keys=[sheet_id])
    move = relationship("AvailableMoves", foreign_keys=[move_id])
    name = Column(String, nullable=False)
    score = Column(Integer, nullable=False)
    schema = "public"


class ScoredMoves(Base):
    __tablename__ = "scoredMoves"
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False)
    move_id = Column(UUID(as_uuid=True), ForeignKey("availableMoves.id"))
    heat_id = Column(UUID(as_uuid=True), ForeignKey("heat.id"))
    heat = relationship("Heat", foreign_keys=[heat_id])
    run_number = Column(String, nullable=False)
    move = relationship("AvailableMoves", foreign_keys=[move_id])
    judge_id = Column(String, nullable=False)
    athlete_id = Column(UUID(as_uuid=True), ForeignKey("athlete.id"), nullable=False)
    athlete = relationship("Athlete", foreign_keys=[athlete_id])
    direction = Column(String, nullable=False)
    schema = "public"


class ScoredBonuses(Base):
    __tablename__ = "scoredBonuses"
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False)
    bonus_id = Column(
        UUID(as_uuid=True), ForeignKey("availableBonuses.id"), nullable=False
    )
    move_id = Column(UUID(as_uuid=True), ForeignKey("scoredMoves.id"), nullable=False)
    bonus = relationship("AvailableBonuses", foreign_keys=[bonus_id])
    move = relationship("ScoredMoves", foreign_keys=[move_id])
    judge_id = Column(String, nullable=False)
    schema = "public"
