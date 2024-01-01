"""add number of judges to phase

Revision ID: 74fecaa4ec6e
Revises: 014230cae1d9
Create Date: 2024-01-01 11:01:35.115516

"""
import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision = '74fecaa4ec6e'
down_revision = '014230cae1d9'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('phase', sa.Column('number_of_judges', sa.Integer(), nullable=False, server_default="3"))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('phase', 'number_of_judges')
    # ### end Alembic commands ###
