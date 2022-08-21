from fastapi_quickcrud import sqlalchemy_to_pydantic

from db.models import Bug

bug_pydantic = sqlalchemy_to_pydantic(Bug)
