"""Add intiial schema

Revision ID: 7a054990608f
Revises: 
Create Date: 2023-02-05 11:34:01.419209

"""
import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "7a054990608f"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "athlete",
        sa.Column("id", postgresql.UUID(), nullable=False),
        sa.Column("first_name", sa.String(), nullable=True),
        sa.Column("last_name", sa.String(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "competition",
        sa.Column("id", postgresql.UUID(), nullable=False, comment="Competition ID"),
        sa.Column("name", sa.String(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "scoreSheet",
        sa.Column("id", postgresql.UUID(), nullable=False, comment="Competition ID"),
        sa.Column("name", sa.String(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "availableMoves",
        sa.Column("id", postgresql.UUID(), nullable=False),
        sa.Column("sheet_id", postgresql.UUID(), nullable=True),
        sa.Column("name", sa.String(), nullable=True),
        sa.Column("score", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["sheet_id"],
            ["scoreSheet.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "event",
        sa.Column("id", postgresql.UUID(), nullable=False),
        sa.Column("competition_id", postgresql.UUID(), nullable=False),
        sa.Column("name", sa.String(), nullable=True),
        sa.ForeignKeyConstraint(
            ["competition_id"],
            ["competition.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "availableBonuses",
        sa.Column("id", postgresql.UUID(), nullable=False),
        sa.Column("sheet_id", postgresql.UUID(), nullable=True),
        sa.Column("move_id", postgresql.UUID(), nullable=True),
        sa.Column("name", sa.String(), nullable=True),
        sa.Column("score", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["move_id"],
            ["availableMoves.id"],
        ),
        sa.ForeignKeyConstraint(
            ["sheet_id"],
            ["scoreSheet.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "phase",
        sa.Column("id", postgresql.UUID(), nullable=False),
        sa.Column("event_id", postgresql.UUID(), nullable=True),
        sa.Column("name", sa.String(), nullable=True),
        sa.Column("number_of_runs", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["event_id"],
            ["event.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "heat",
        sa.Column("id", postgresql.UUID(), nullable=False),
        sa.Column("phase_id", postgresql.UUID(), nullable=True),
        sa.Column("name", sa.String(), nullable=True),
        sa.ForeignKeyConstraint(
            ["phase_id"],
            ["phase.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "run",
        sa.Column("id", postgresql.UUID(), nullable=False),
        sa.Column("heat_id", postgresql.UUID(), nullable=True),
        sa.Column("name", sa.String(), nullable=True),
        sa.ForeignKeyConstraint(
            ["heat_id"],
            ["heat.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "scoredMoves",
        sa.Column("id", postgresql.UUID(), nullable=False, comment="Competition ID"),
        sa.Column("move_id", postgresql.UUID(), nullable=True),
        sa.Column("run_id", postgresql.UUID(), nullable=True),
        sa.Column("judge_id", sa.String(), nullable=True),
        sa.ForeignKeyConstraint(
            ["move_id"],
            ["availableMoves.id"],
        ),
        sa.ForeignKeyConstraint(
            ["run_id"],
            ["run.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "scoredBonuses",
        sa.Column("id", postgresql.UUID(), nullable=False, comment="Competition ID"),
        sa.Column("bonus_id", postgresql.UUID(), nullable=True),
        sa.Column("move_id", postgresql.UUID(), nullable=True),
        sa.Column("judge_id", sa.String(), nullable=True),
        sa.ForeignKeyConstraint(
            ["bonus_id"],
            ["availableBonuses.id"],
        ),
        sa.ForeignKeyConstraint(
            ["move_id"],
            ["scoredMoves.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("scoredBonuses")
    op.drop_table("scoredMoves")
    op.drop_table("run")
    op.drop_table("heat")
    op.drop_table("phase")
    op.drop_table("availableBonuses")
    op.drop_table("event")
    op.drop_table("availableMoves")
    op.drop_table("scoreSheet")
    op.drop_table("competition")
    op.drop_table("athlete")
    # ### end Alembic commands ###
