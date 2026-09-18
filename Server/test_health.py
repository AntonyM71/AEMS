"""The /health endpoint must fail the container when Redis is gone.

Compose routes every broadcast through Redis, so a server that cannot reach it
is not serving judges even though its database answers.
"""

from unittest.mock import patch

from fastapi.testclient import TestClient


def test_healthy_when_database_and_redis_answer(client: TestClient) -> None:
    with patch("main.redis_is_reachable", return_value=True):
        response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_unhealthy_when_redis_is_unreachable(client: TestClient) -> None:
    with patch("main.redis_is_reachable", return_value=False):
        response = client.get("/health")

    assert response.status_code == 503
    assert response.json() == {"status": "unhealthy"}
