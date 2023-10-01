from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

database_address = "postgresql://pi:kayak1@192.168.0.28/aems"

engine = create_engine(database_address)
# TODO: Update to use dotenv
session = sessionmaker(engine)


def get_transaction_session():
    try:
        db = session()
        yield db
    finally:
        db.close()
