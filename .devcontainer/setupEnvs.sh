(cd Webapp && npm install)
(cd Server && pip install .)
(cd Server && alembic upgrade head && python seed_scoresheets.py)