"""/health reports the server's dependencies; /livez reports only the process.

The container healthcheck uses /livez so that autoheal restarts the server only
for faults a restart can fix: restarting the server never brings Redis back.
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


def test_alive_even_when_redis_is_unreachable(client: TestClient) -> None:
    with patch("main.redis_is_reachable", return_value=False):
        response = client.get("/livez")

    assert response.status_code == 200
    assert response.json() == {"status": "alive"}
