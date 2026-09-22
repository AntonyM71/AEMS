"""Add run status unique constraint

Revision ID: 771119b23e40
Revises: 9b6bcf99f348
Create Date: 2026-09-22 12:00:00.000000

"""

import logging

from sqlalchemy import text

from alembic import op

# revision identifiers, used by Alembic.
revision = "771119b23e40"
down_revision = "9b6bcf99f348"
branch_labels = None
depends_on = None

logger = logging.getLogger("alembic.runtime.migration")


def upgrade() -> None:
    connection = op.get_bind()
    removed = connection.execute(
        text(
            """
            DELETE FROM "runStatus" rs
            USING (
                SELECT id,
                       ROW_NUMBER() OVER (
                           PARTITION BY heat_id, phase_id, athlete_id, run_number
                           ORDER BY locked DESC, id
                       ) AS rn
                FROM "runStatus"
            ) ranked
            WHERE rs.id = ranked.id AND ranked.rn > 1
            RETURNING rs.id, rs.heat_id, rs.phase_id, rs.athlete_id, rs.run_number
            """
        )
    ).fetchall()
    for row in removed:
        logger.info(
            "Removed duplicate runStatus id=%s (heat_id=%s, phase_id=%s, "
            "athlete_id=%s, run_number=%s)",
            row.id,
            row.heat_id,
            row.phase_id,
            row.athlete_id,
            row.run_number,
        )

    op.create_unique_constraint(
        "sth_uq_runStatus_run_key",
        "runStatus",
        ["heat_id", "phase_id", "athlete_id", "run_number"],
    )


def downgrade() -> None:
    op.drop_constraint("sth_uq_runStatus_run_key", "runStatus", type_="unique")
