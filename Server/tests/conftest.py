import pytest
from unittest.mock import MagicMock, patch
from sqlalchemy.orm import Session

@pytest.fixture(autouse=True)
def mock_db_setup():
    """Mock database setup for all tests"""
    # Mock the database client module
    with patch('db.client.load_dotenv'), \
         patch('db.client.create_engine'), \
         patch('db.client.sessionmaker'), \
         patch('db.client.get_transaction_session') as mock_get_session:

        # Create a mock session
        mock_session = MagicMock(spec=Session)

        # Configure the session context manager behavior
        mock_get_session.return_value.__enter__.return_value = mock_session
        mock_get_session.return_value.__exit__.return_value = None

        yield mock_session
