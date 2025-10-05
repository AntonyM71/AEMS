from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class AthleteHeatCreate(BaseModel):
    id: Optional[UUID] = None
    athlete_id: UUID
    heat_id: UUID
    phase_id: UUID
    last_phase_rank: Optional[int] = None


class AthleteHeatResponse(BaseModel):
    id: UUID
    athlete_id: UUID
    heat_id: UUID
    phase_id: UUID

    class Config:
        orm_mode = True


class AthleteHeatUpdate(BaseModel):
    athlete_id: Optional[UUID] = None
    heat_id: Optional[UUID] = None
    phase_id: Optional[UUID] = None
    last_phase_rank: Optional[int] = None


class CompetitionCreate(BaseModel):
    id: Optional[UUID] = None
    name: str


class CompetitionResponse(BaseModel):
    id: UUID
    name: str

    class Config:
        orm_mode = True


class CompetitionUpdate(BaseModel):
    name: Optional[str] = None


class CompetitionWithEvents(CompetitionResponse):
    events: list[dict] = []


class PhaseNested(BaseModel):
    id: UUID
    event_id: UUID
    name: str
    number_of_runs: int
    number_of_runs_for_score: int
    number_of_judges: int
    scoresheet: UUID

    class Config:
        orm_mode = True


class AthleteCreate(BaseModel):
    id: Optional[UUID] = None
    first_name: str
    last_name: str
    affiliation: Optional[str] = None
    bib: str


class AthleteResponse(BaseModel):
    id: UUID
    first_name: str
    last_name: str
    affiliation: Optional[str] = None
    bib: str

    class Config:
        orm_mode = True


class AthleteUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    affiliation: Optional[str] = None
    bib: Optional[str] = None


class AvailableBonusesResponse(BaseModel):
    id: UUID
    sheet_id: UUID
    move_id: UUID
    name: str
    score: int  # Integer, not float - matches models.py
    display_order: Optional[int] = None

    class Config:
        orm_mode = True


class AvailableMovesResponse(BaseModel):
    id: UUID
    sheet_id: UUID
    name: str
    fl_score: int  # Changed from float to int to match models.py
    rb_score: int  # Added missing field
    direction: str  # Added missing field

    class Config:
        orm_mode = True


class CompetitionNested(BaseModel):
    id: UUID
    name: str

    class Config:
        orm_mode = True


class EventResponse(BaseModel):
    id: UUID
    competition_id: UUID
    name: str
    competition_foreign: Optional[list[CompetitionNested]] = None
    phase_foreign: Optional[list[PhaseNested]] = None

    class Config:
        orm_mode = True


class EventCreateRequest(BaseModel):
    id: Optional[UUID] = None
    competition_id: UUID
    name: str


class EventNested(BaseModel):
    id: UUID
    competition_id: UUID
    name: str

    class Config:
        orm_mode = True


class PhaseResponse(BaseModel):
    id: UUID
    event_id: UUID
    name: str
    number_of_runs: int
    number_of_runs_for_score: int
    number_of_judges: int
    scoresheet: UUID
    event_foreign: Optional[list[EventNested]] = None

    class Config:
        orm_mode = True


class HeatCreate(BaseModel):
    id: Optional[UUID] = None
    competition_id: UUID
    name: str


class AthleteHeatNested(BaseModel):
    id: UUID
    athlete_id: UUID
    heat_id: UUID

    class Config:
        orm_mode = True


class HeatResponse(BaseModel):
    id: UUID
    competition_id: UUID
    name: str
    competition_foreign: Optional[list[CompetitionNested]] = None
    athleteheat_foreign: Optional[list[AthleteHeatNested]] = None

    class Config:
        orm_mode = True


class HeatUpdate(BaseModel):
    competition_id: Optional[UUID] = None
    name: Optional[str] = None


class PhaseCreate(BaseModel):
    id: Optional[UUID] = None
    event_id: UUID
    name: str
    number_of_runs: int = 3
    number_of_runs_for_score: int = 2
    number_of_judges: int = 3
    scoresheet: UUID


class PhaseUpdate(BaseModel):
    event_id: Optional[UUID] = None
    name: Optional[str] = None
    number_of_runs: Optional[int] = None
    number_of_runs_for_score: Optional[int] = None
    number_of_judges: Optional[int] = None
    scoresheet: Optional[UUID] = None


class RunStatusResponse(BaseModel):
    id: UUID
    heat_id: Optional[UUID] = None
    run_number: int
    phase_id: UUID
    athlete_id: UUID
    locked: bool
    did_not_start: bool

    class Config:
        orm_mode = True


class ScoreSheetCreate(BaseModel):
    id: Optional[UUID] = None
    name: str


class ScoreSheetResponse(BaseModel):
    id: UUID
    name: str

    class Config:
        orm_mode = True
