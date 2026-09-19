from pydantic import AnyUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


class TimerSettings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")

    socketio_url: AnyUrl = AnyUrl("http://192.168.0.28:81")
    socketio_path: str = "/socket.io/"
    enable_websocket: bool = True


class FakeTimerSettings(TimerSettings):
    socketio_url: AnyUrl = AnyUrl("http://localhost:8000")
