from collections.abc import Generator
from unittest.mock import MagicMock, patch

import pytest
from sqlalchemy.orm import Session

# Mock database functions at module level
patch('db.client.get_database_address', return_value='mock://db').start()
patch('db.client.create_engine').start()
patch('db.client.sessionmaker').start()

@pytest.fixture(autouse=True)
def mock_db_session() -> Generator[Session, None, None]:
    """Mock database session for all tests"""
    with patch('db.client.get_transaction_session') as mock_get_session:
        # Create a mock session
        mock_session = MagicMock(spec=Session)

        # Configure the session context manager behavior
        mock_get_session.return_value.__enter__.return_value = mock_session
        mock_get_session.return_value.__exit__.return_value = None

        yield mock_session
