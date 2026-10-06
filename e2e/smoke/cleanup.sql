-- Deletes one smoke-test competition and everything created under it.
-- Usage (from the repo root on the server):
--   docker exec -i aems-db-1 psql -U postgres -v name='ZZ Smoke Test 2026-10-05' < e2e/smoke/cleanup.sql
-- Refuses to touch any competition whose name does not start with "ZZ Smoke Test",
-- and exits non-zero without deleting anything unless exactly one matches.
\set ON_ERROR_STOP on
BEGIN;
CREATE TEMP TABLE c AS
    SELECT id FROM competition WHERE name = :'name' AND name LIKE 'ZZ Smoke Test %';
DO $$
BEGIN
    IF (SELECT count(*) FROM c) <> 1 THEN
        RAISE EXCEPTION 'expected exactly one smoke competition with the given name; nothing deleted';
    END IF;
END $$;
CREATE TEMP TABLE h AS SELECT id FROM heat WHERE competition_id IN (SELECT id FROM c);
CREATE TEMP TABLE e AS SELECT id FROM event WHERE competition_id IN (SELECT id FROM c);
CREATE TEMP TABLE p AS SELECT id FROM phase WHERE event_id IN (SELECT id FROM e);
-- Only athletes entered nowhere else, so a reused athlete is never lost.
CREATE TEMP TABLE a AS
    SELECT athlete_id AS id FROM athleteheat WHERE phase_id IN (SELECT id FROM p)
    EXCEPT SELECT athlete_id FROM athleteheat WHERE phase_id NOT IN (SELECT id FROM p);
DELETE FROM "scoredBonuses" WHERE move_id IN (SELECT id FROM "scoredMoves" WHERE heat_id IN (SELECT id FROM h));
DELETE FROM "scoredMoves" WHERE heat_id IN (SELECT id FROM h);
DELETE FROM "runStatus" WHERE heat_id IN (SELECT id FROM h);
DELETE FROM "runUpdates" WHERE heat_id IN (SELECT id FROM h);
DELETE FROM athleteheat WHERE phase_id IN (SELECT id FROM p);
DELETE FROM athlete WHERE id IN (SELECT id FROM a);
DELETE FROM heat WHERE id IN (SELECT id FROM h);
DELETE FROM phase WHERE id IN (SELECT id FROM p);
DELETE FROM event WHERE id IN (SELECT id FROM e);
DELETE FROM competition WHERE id IN (SELECT id FROM c);
COMMIT;
