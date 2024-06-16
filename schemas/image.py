import uuid
from datetime import datetime

from pydantic import BaseModel


class ImageListOpts(BaseModel):
    is_successful: bool | None = None
    offset: int = 0
    limit: int = 100


class ImageCreateOpts(BaseModel):
    file: bytes
    path: str
    is_successful: bool | None = None
    user: uuid.UUID


class ImageResponse(BaseModel):
    id: uuid.UUID
    path: str
    is_successful: bool | None
    created_at: datetime
    updated_at: datetime
    user: uuid.UUID

    link: str


class ImageUpdateOpts(BaseModel):
    is_successful: bool | None = None
