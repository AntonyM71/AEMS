"""add move direction

Revision ID: 23ba83f5dec4
Revises: 51ca4c9f5bc1
Create Date: 2023-03-11 17:47:50.581450

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "23ba83f5dec4"
down_revision = "51ca4c9f5bc1"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("availableMoves", sa.Column("fl_score", sa.Integer(), nullable=True))
    op.add_column("availableMoves", sa.Column("rb_score", sa.Integer(), nullable=True))
    op.add_column("availableMoves", sa.Column("direction", sa.String(), nullable=True))
    op.drop_column("availableMoves", "score")
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "availableMoves",
        sa.Column("score", sa.INTEGER(), autoincrement=False, nullable=True),
    )
    op.drop_column("availableMoves", "direction")
    op.drop_column("availableMoves", "rb_score")
    op.drop_column("availableMoves", "fl_score")
    # ### end Alembic commands ###
