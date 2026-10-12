from collections.abc import Generator
from io import BytesIO
from unittest.mock import MagicMock
from uuid import UUID

import pytest
from fastapi.testclient import TestClient
from httpx import Response
from PIL import Image
from sqlalchemy.orm import Session

from db.client import get_transaction_session
from db.models import Competition, CompetitionImage
from main import app

COMPETITION_ID = UUID("11111111-1111-1111-1111-111111111111")
LOGO_URL = f"/competition_management/competition/{COMPETITION_ID}/image/logo"


def make_image(image_format: str = "PNG", size: tuple[int, int] = (40, 20)) -> bytes:
    buffer = BytesIO()
    Image.new("RGB", size, "red").save(buffer, format=image_format)
    return buffer.getvalue()


@pytest.fixture
def stored_images() -> dict[tuple[UUID, str], CompetitionImage]:
    return {}


@pytest.fixture
def db_session(stored_images: dict[tuple[UUID, str], CompetitionImage]) -> MagicMock:
    """A session that keeps CompetitionImage rows in a dict, keyed like the table."""
    session = MagicMock(spec=Session)

    def get(model: type, key: object) -> object:
        if model is Competition:
            return Competition(id=key) if key == COMPETITION_ID else None
        competition_id, kind = key  # type: ignore[misc]
        return stored_images.get((competition_id, kind))

    def merge(image: CompetitionImage) -> CompetitionImage:
        stored_images[(image.competition_id, image.kind)] = image
        return image

    def delete(image: CompetitionImage) -> None:
        stored_images.pop((image.competition_id, image.kind), None)

    session.get.side_effect = get
    session.merge.side_effect = merge
    session.delete.side_effect = delete
    return session


@pytest.fixture
def test_client(db_session: MagicMock) -> Generator[TestClient]:
    app.dependency_overrides[get_transaction_session] = lambda: db_session
    yield TestClient(app)
    app.dependency_overrides.clear()


def upload(
    client: TestClient,
    content: bytes,
    url: str = LOGO_URL,
    filename: str = "logo.png",
    content_type: str = "image/png",
) -> Response:
    return client.put(url, files={"file": (filename, BytesIO(content), content_type)})


def test_an_uploaded_logo_reads_back_unchanged(test_client: TestClient) -> None:
    logo = make_image()

    assert upload(test_client, logo).status_code == 204

    response = test_client.get(LOGO_URL)
    assert response.status_code == 200
    assert response.content == logo
    assert response.headers["content-type"] == "image/png"


def test_the_content_type_comes_from_the_image_not_the_client(
    test_client: TestClient,
) -> None:
    upload(test_client, make_image("JPEG"), content_type="image/png")

    assert test_client.get(LOGO_URL).headers["content-type"] == "image/jpeg"


def test_uploading_again_replaces_the_image(test_client: TestClient) -> None:
    upload(test_client, make_image(size=(10, 10)))
    replacement = make_image(size=(30, 10))

    upload(test_client, replacement)

    assert test_client.get(LOGO_URL).content == replacement


def test_deleting_the_logo_leaves_the_signature(test_client: TestClient) -> None:
    signature_url = LOGO_URL.replace("logo", "signature")
    signature = make_image(size=(50, 10))
    upload(test_client, make_image())
    upload(test_client, signature, url=signature_url)

    assert test_client.delete(LOGO_URL).status_code == 204

    assert test_client.get(LOGO_URL).status_code == 404
    assert test_client.get(signature_url).content == signature


def test_deleting_a_missing_image_succeeds(test_client: TestClient) -> None:
    assert test_client.delete(LOGO_URL).status_code == 204


def test_a_text_file_named_png_is_rejected_and_keeps_the_old_image(
    test_client: TestClient,
) -> None:
    logo = make_image()
    upload(test_client, logo)

    response = upload(test_client, b"not an image at all")

    assert response.status_code == 415
    assert "PNG or JPEG" in response.json()["detail"]
    assert test_client.get(LOGO_URL).content == logo


def test_an_image_in_another_format_is_rejected(test_client: TestClient) -> None:
    response = upload(test_client, make_image("GIF"), filename="logo.gif")

    assert response.status_code == 415
    assert test_client.get(LOGO_URL).status_code == 404


def test_an_image_over_10_mb_is_rejected(test_client: TestClient) -> None:
    oversized = make_image() + b"\0" * (10 * 1024 * 1024)

    response = upload(test_client, oversized)

    assert response.status_code == 413
    assert "10 MB" in response.json()["detail"]
    assert test_client.get(LOGO_URL).status_code == 404


def test_uploading_for_an_unknown_competition_is_rejected(
    test_client: TestClient, stored_images: dict
) -> None:
    url = "/competition_management/competition/22222222-2222-2222-2222-222222222222/image/logo"

    response = upload(test_client, make_image(), url=url)

    assert response.status_code == 404
    assert stored_images == {}


def test_an_unknown_kind_is_rejected(test_client: TestClient) -> None:
    response = upload(test_client, make_image(), url=LOGO_URL.replace("logo", "banner"))

    assert response.status_code == 422
