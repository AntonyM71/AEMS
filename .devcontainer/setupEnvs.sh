(cd Webapp && npm install)
(cd Server && pip install .)
(cd Server && alembic upgrade head && python -m scripts.seed_scoresheets)