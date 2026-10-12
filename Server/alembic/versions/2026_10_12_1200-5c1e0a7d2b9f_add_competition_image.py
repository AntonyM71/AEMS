"""Add competition image

Revision ID: 5c1e0a7d2b9f
Revises: 337e72020f04
Create Date: 2026-10-12 12:00:00.000000

"""

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op

# revision identifiers, used by Alembic.
revision = "5c1e0a7d2b9f"
down_revision = "337e72020f04"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "competitionImage",
        sa.Column("competition_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("kind", sa.String(), nullable=False),
        sa.Column("content", sa.LargeBinary(), nullable=False),
        sa.Column("content_type", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(["competition_id"], ["competition.id"]),
        sa.PrimaryKeyConstraint(
            "competition_id", "kind", name="sth_pk_competitionImage"
        ),
    )


def downgrade() -> None:
    op.drop_table("competitionImage")
