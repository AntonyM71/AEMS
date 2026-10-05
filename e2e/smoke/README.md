# Deployment smoke check

Checks that a *deployed* AEMS server works end to end. Run it after an upgrade and
before an event. The e2e suite in `../tests` tests the code in CI; this checks the
things CI cannot see on a real server: nginx routing, Redis between workers, the
database after migrations, and the built Webapp.

It drives a real browser through one throwaway competition, **ZZ Smoke Test
YYYY-MM-DD** (today's date):

1. Admin imports a three-athlete start list.
2. Two scribes score a run; the head judge shows the average.
3. The head judge locks the run; both scribes see it live and can't score; unlock.
4. Phase and heat results PDFs generate.
5. A scored athlete moves heat and keeps their scores.
6. The Arena, Overlay, Commentator and Score pages load.

It fails on any page error or server 5xx, except 502s from the optional graphics
server. It never touches the broadcast controller, so real screens are unaffected.

## Running it

It writes to the server it is pointed at, so run it between competitions, not
during one. There is no default target.

```bash
cd e2e
npm ci && npx playwright install chromium
SMOKE_URL=http://localhost:81 npm run smoke
```

Screenshots and an HTML report land in `e2e/smoke/report/`.

## Cleaning up

There is deliberately no API for deleting a competition. Remove the smoke
competition from the server's database with:

```bash
docker exec -i aems-db-1 psql -U postgres \
  -v name='ZZ Smoke Test 2026-10-05' < e2e/smoke/cleanup.sql
```

The script only deletes a competition whose name starts with `ZZ Smoke Test`, and
stops unless exactly one competition matches. The check refuses to start while a
smoke competition from the same day still exists.
