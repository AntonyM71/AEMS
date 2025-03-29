"""Simple tests for UUID handling without external dependencies."""
import uuid

from db.models import (
    Competition,
    Event,
    Heat,
    Phase,
)


def test_uuid_imports():
    """Test that UUID module is available."""
    assert uuid is not None


def test_model_existence():
    """Test that database models are importable."""
    assert Competition is not None
    assert Event is not None
    assert Phase is not None
    assert Heat is not None


def test_uuid_generation():
    """Test that UUIDs can be generated."""
    test_uuid = str(uuid.uuid4())
    assert isinstance(test_uuid, str)
    assert len(test_uuid) == 36  # Standard UUID string length
