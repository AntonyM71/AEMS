"""Add run updates

Revision ID: 337e72020f04
Revises: 771119b23e40
Create Date: 2026-09-22 12:01:00.000000

"""

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op

# revision identifiers, used by Alembic.
revision = "337e72020f04"
down_revision = "771119b23e40"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "runUpdates",
        sa.Column("heat_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("athlete_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("phase_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("run_number", sa.Integer(), nullable=False),
        sa.Column("judge_id", sa.String(), nullable=False),
        sa.Column("request_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.ForeignKeyConstraint(["athlete_id"], ["athlete.id"]),
        sa.ForeignKeyConstraint(["heat_id"], ["heat.id"]),
        sa.ForeignKeyConstraint(["phase_id"], ["phase.id"]),
        sa.PrimaryKeyConstraint(
            "heat_id",
            "athlete_id",
            "phase_id",
            "run_number",
            "judge_id",
            name="sth_pk_runUpdates",
        ),
    )


def downgrade() -> None:
    op.drop_table("runUpdates")
