"""add paddler info

Revision ID: 51ca4c9f5bc1
Revises: 33e9af80743a
Create Date: 2023-03-11 16:29:04.506901

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '51ca4c9f5bc1'
down_revision = '33e9af80743a'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('athlete', sa.Column('bib', sa.String(), nullable=True))
    op.add_column('athleteheat', sa.Column('scoresheet', postgresql.UUID(), nullable=True))
    op.create_foreign_key(None, 'athleteheat', 'scoreSheet', ['scoresheet'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'athleteheat', type_='foreignkey')
    op.drop_column('athleteheat', 'scoresheet')
    op.drop_column('athlete', 'bib')
    # ### end Alembic commands ###
