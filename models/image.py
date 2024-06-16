import uuid
from datetime import datetime

from sqlalchemy import func, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped

from models.BaseModel import EntityMeta


class Image(EntityMeta):
    __tablename__ = "image"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    path: Mapped[str]
    is_successful: Mapped[bool] = mapped_column(nullable=True)
    created_at: Mapped[datetime] = mapped_column(default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        default=func.now(), onupdate=func.now(), nullable=False
    )
    user: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id"))
