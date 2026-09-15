"""The /health endpoint must fail the container when Redis is gone.

Compose routes every broadcast through Redis, so a server that cannot reach it
is not serving judges even though its database answers.
"""

from collections.abc import Generator
from unittest.mock import MagicMock, patch

import pytest
from fastapi.testclient import TestClient

from db.client import get_transaction_session
from main import app


@pytest.fixture
def client() -> Generator[TestClient]:
    session = MagicMock()
    session.execute.return_value.scalar.return_value = 1
    app.dependency_overrides[get_transaction_session] = lambda: session
    yield TestClient(app)
    app.dependency_overrides.clear()


def test_healthy_when_database_and_redis_answer(client: TestClient) -> None:
    with patch("main.redis_is_reachable", return_value=True):
        response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_unhealthy_when_redis_is_unreachable(client: TestClient) -> None:
    with patch("main.redis_is_reachable", return_value=False):
        response = client.get("/health")

    assert response.json() == {"status": "unhealthy"}
