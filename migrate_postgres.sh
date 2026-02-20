#!/bin/bash
# migrate_postgres.sh
#
# Data-preserving migration script for upgrading to PostgreSQL 18+ Docker images.
#
# PostgreSQL 18+ Docker images changed the default data directory from
# /var/lib/postgresql/data to a version-specific subdirectory. This requires
# updating the Docker volume mount point from /var/lib/postgresql/data to
# /var/lib/postgresql (the parent directory).
#
# This script performs the following steps:
#   1. Exports existing database data using pg_dump
#   2. Stops all AEMS containers
#   3. Archives the old data directory
#   4. Starts fresh PostgreSQL 18+ with the new mount configuration
#   5. Restores the exported database data
#
# Usage:
#   chmod +x migrate_postgres.sh
#   ./migrate_postgres.sh

set -e

TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP_SQL="/tmp/aems_postgres_backup_${TIMESTAMP}.sql"
OLD_DATA_DIR=~/postgres-prod-data
ARCHIVE_DIR="${OLD_DATA_DIR}-backup-${TIMESTAMP}"

echo "AEMS PostgreSQL Migration Script"
echo "================================="
echo ""
echo "This script migrates your PostgreSQL data to be compatible with"
echo "PostgreSQL 18+ Docker images."
echo ""
echo "What this script will do:"
echo "  1. Export your existing database to: $BACKUP_SQL"
echo "  2. Stop all running AEMS containers"
echo "  3. Archive your old data directory to: $ARCHIVE_DIR"
echo "  4. Start fresh PostgreSQL 18+ containers (new mount configuration)"
echo "  5. Restore your database data"
echo ""
echo "WARNING: Ensure you have enough disk space for both the archive and the"
echo "         new database before continuing."
echo ""
read -rp "Continue with migration? (y/N): " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo "Migration cancelled."
    exit 0
fi

# Step 1: Export existing database
echo ""
echo "Step 1: Exporting existing database..."
if docker compose ps db 2>/dev/null | grep -qE "(running|Up)"; then
    docker compose exec db pg_dump -U postgres postgres >"$BACKUP_SQL"
    echo "  Database exported to: $BACKUP_SQL"
else
    echo ""
    echo "ERROR: The database container is not running."
    echo "  - If you have not yet upgraded docker-compose.yaml, start the old"
    echo "    containers first with: docker compose up db -d"
    echo "  - If you cannot start the old container, restore from your most"
    echo "    recent backup manually after starting fresh containers."
    exit 1
fi

# Step 2: Stop all containers
echo ""
echo "Step 2: Stopping all AEMS containers..."
docker compose down
echo "  All containers stopped."

# Step 3: Archive old data directory
echo ""
echo "Step 3: Archiving old PostgreSQL data directory..."
if [ -d "$OLD_DATA_DIR" ]; then
    mv "$OLD_DATA_DIR" "$ARCHIVE_DIR"
    echo "  Old data archived to: $ARCHIVE_DIR"
else
    echo "  No existing data directory found at $OLD_DATA_DIR, skipping archive."
fi
mkdir -p "$OLD_DATA_DIR"

# Step 4: Start fresh PostgreSQL with new mount configuration
echo ""
echo "Step 4: Starting fresh PostgreSQL with new mount configuration..."
docker compose up db -d
echo "  Waiting for PostgreSQL to be ready..."
POSTGRES_READY_TIMEOUT="${POSTGRES_READY_TIMEOUT:-60}"
for i in $(seq 1 "$POSTGRES_READY_TIMEOUT"); do
    if docker compose exec db pg_isready -U postgres >/dev/null 2>&1; then
        echo "  PostgreSQL is ready."
        break
    fi
    if [ "$i" -eq "$POSTGRES_READY_TIMEOUT" ]; then
        echo "ERROR: PostgreSQL did not become ready in time."
        echo "  Check logs with: docker compose logs db"
        exit 1
    fi
    sleep 2
done

# Step 5: Restore database data
echo ""
echo "Step 5: Restoring database data..."
docker compose exec -T db psql -U postgres postgres <"$BACKUP_SQL"
echo "  Database restored successfully."

# Start all services
echo ""
echo "Starting all AEMS services..."
docker compose up -d

echo ""
echo "========================================="
echo "Migration complete!"
echo "========================================="
echo ""
echo "Your AEMS system is now running with the new PostgreSQL configuration."
echo ""
echo "Your old data has been archived to: $ARCHIVE_DIR"
echo "Your SQL backup is at:              $BACKUP_SQL"
echo ""
echo "Once you have verified everything is working correctly, you may safely"
echo "delete these backups."
