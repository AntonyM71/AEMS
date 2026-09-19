from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

IN_MEMORY = "memory"
_REDIS_SCHEMES = ("redis://", "rediss://", "unix://")


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")

    port: int = 3000
    log_json_format: bool = False
    log_level: str = "INFO"
    cors_allowed_origins: str = ""
    redis_url: str
    connection_string: str = Field(min_length=1)

    @field_validator("redis_url")
    @classmethod
    def _redis_url_must_be_valid(cls, value: str) -> str:
        if value == IN_MEMORY or value.startswith(_REDIS_SCHEMES):
            return value
        msg = (
            f"REDIS_URL must be a redis:// URL, or {IN_MEMORY!r} to select the "
            f"in-memory manager, which is only correct for a single worker. "
            f"Got: {value!r}"
        )
        raise ValueError(msg)


settings = Settings()
