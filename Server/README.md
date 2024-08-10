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

## Build openapi.json

```
python buildOpenApiJson.py

ctrl + c
```
