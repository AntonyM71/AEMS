from db.models import Bug
from fastapi_quickcrud import sqlalchemy_to_pydantic

bug_pydantic = sqlalchemy_to_pydantic(Bug)
