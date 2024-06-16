from functools import lru_cache

from pydantic_settings import BaseSettings


class EnvironmentSettings(BaseSettings):
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_HOST: str
    POSTGRES_PORT: str

    DEBUG: bool

    SECRET_KEY: str

    MINIO_ACCESS: str
    MINIO_SECRET: str
    MINIO_HOST: str

    LLM_HOST: str
    SD_HOST: str

    class Config:
        env_file = "configs/.env"
        env_file_encoding = "utf-8"


@lru_cache
def get_environment_variables() -> EnvironmentSettings:
    return EnvironmentSettings()
