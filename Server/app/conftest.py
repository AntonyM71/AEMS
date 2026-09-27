from collections.abc import Generator
from unittest.mock import MagicMock, patch

import pytest
from sqlalchemy.orm import Session

patch("db.client.create_engine").start()
patch("db.client.sessionmaker").start()


@pytest.fixture(autouse=True)
def mock_db_session() -> Generator[Session]:
    with patch("db.client.get_transaction_session") as mock_get_session:
        mock_session = MagicMock(spec=Session)

        mock_get_session.return_value.__enter__.return_value = mock_session
        mock_get_session.return_value.__exit__.return_value = None

        yield mock_session
