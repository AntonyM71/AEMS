"""add move display order

Revision ID: 9b6bcf99f348
Revises: d66d428a8a11
Create Date: 2026-08-13 14:15:00.000000

"""

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision = "9b6bcf99f348"
down_revision = "d66d428a8a11"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "availableMoves", sa.Column("display_order", sa.Integer(), nullable=True)
    )


def downgrade() -> None:
    op.drop_column("availableMoves", "display_order")
