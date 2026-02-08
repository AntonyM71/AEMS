from uuid import UUID

from pydantic import BaseModel


class EventNested(BaseModel):
    id: UUID
    competition_id: UUID
    name: str

    class Config:
        orm_mode = True


class AthleteHeatCreate(BaseModel):
    id: UUID | None = None
    athlete_id: UUID
    heat_id: UUID
    phase_id: UUID
    last_phase_rank: int | None = None


class AthleteHeatResponse(BaseModel):
    id: UUID
    athlete_id: UUID
    heat_id: UUID
    phase_id: UUID

    class Config:
        orm_mode = True


class AthleteHeatUpdate(BaseModel):
    athlete_id: UUID | None = None
    heat_id: UUID | None = None
    phase_id: UUID | None = None
    last_phase_rank: int | None = None


class CompetitionCreate(BaseModel):
    id: UUID | None = None
    name: str


class CompetitionResponse(BaseModel):
    id: UUID
    name: str
    event_foreign: list[EventNested] | None = None

    class Config:
        orm_mode = True


class CompetitionUpdate(BaseModel):
    name: str | None = None


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
    id: UUID | None = None
    first_name: str
    last_name: str
    affiliation: str | None = None
    bib: str


class AthleteResponse(BaseModel):
    id: UUID
    first_name: str
    last_name: str
    affiliation: str | None = None
    bib: str

    class Config:
        orm_mode = True


class AthleteUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    affiliation: str | None = None
    bib: str | None = None


class AvailableBonusesResponse(BaseModel):
    id: UUID
    sheet_id: UUID
    move_id: UUID
    name: str
    score: int  # Integer, not float - matches models.py
    display_order: int | None = None

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
    competition_foreign: list[CompetitionNested] | None = None
    phase_foreign: list[PhaseNested] | None = None

    class Config:
        orm_mode = True


class EventCreateRequest(BaseModel):
    id: UUID | None = None
    competition_id: UUID
    name: str


class PhaseResponse(BaseModel):
    id: UUID
    event_id: UUID
    name: str
    number_of_runs: int
    number_of_runs_for_score: int
    number_of_judges: int
    scoresheet: UUID
    event_foreign: list[EventNested] | None = None

    class Config:
        orm_mode = True


class HeatCreate(BaseModel):
    id: UUID | None = None
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
    competition_foreign: list[CompetitionNested] | None = None
    athleteheat_foreign: list[AthleteHeatNested] | None = None

    class Config:
        orm_mode = True


class HeatUpdate(BaseModel):
    competition_id: UUID | None = None
    name: str | None = None


class PhaseCreate(BaseModel):
    id: UUID | None = None
    event_id: UUID
    name: str
    number_of_runs: int = 3
    number_of_runs_for_score: int = 2
    number_of_judges: int = 3
    scoresheet: UUID


class PhaseUpdate(BaseModel):
    event_id: UUID | None = None
    name: str | None = None
    number_of_runs: int | None = None
    number_of_runs_for_score: int | None = None
    number_of_judges: int | None = None
    scoresheet: UUID | None = None


class RunStatusResponse(BaseModel):
    id: UUID
    heat_id: UUID | None = None
    run_number: int
    phase_id: UUID
    athlete_id: UUID
    locked: bool
    did_not_start: bool

    class Config:
        orm_mode = True


class ScoreSheetCreate(BaseModel):
    id: UUID | None = None
    name: str


class ScoreSheetResponse(BaseModel):
    id: UUID
    name: str

    class Config:
        orm_mode = True
