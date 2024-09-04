# AEMS SERVER

## Getting Started

### Run the app using:

```
uvicorn main:app
```

### Migrate the database with:

```
alembic upgrade head
```

###Â Create a new Database Revision with:

```
alembic revision --autogenerate
```

## Seed default scoresheets

```
python -m scripts.seed_scoresheets
```

## Build openapi.json

```
python -m scripts.buildOpenApiJson

ctrl + c
```
