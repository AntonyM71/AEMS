"""Tests for UUID compatibility between PostgreSQL and SQLite."""
import uuid


def test_uuid_generation():
    """Test UUID generation and string conversion."""
    # Generate a UUID
    new_uuid = uuid.uuid4()

    # Convert to string
    uuid_str = str(new_uuid)

    # Validate UUID format
    assert len(
        uuid_str) == 36, f"UUID string has wrong length: {len(uuid_str)}"
    assert uuid_str.count(
        '-') == 4, f"UUID string has wrong format: {uuid_str}"

    # Test round-trip conversion
    parsed_uuid = uuid.UUID(uuid_str)
    assert parsed_uuid == new_uuid, "UUID round-trip conversion failed"


def test_uuid_for_primary_key():
    """Test UUID as a primary key value."""
    # Generate a UUID
    key_uuid = uuid.uuid4()
    key_str = str(key_uuid)

    # In SQLite, we would store as string
    sqlite_id = key_str

    # In PostgreSQL, we would use native UUID type
    # For test purposes, we just ensure the format is compatible
    assert len(sqlite_id) == 36

    # Ensure we can convert back to UUID object
    try:
        uuid.UUID(sqlite_id)
    except ValueError as e:
        assert False, f"Failed to parse UUID from string: {e}"
