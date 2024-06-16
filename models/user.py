import uuid
from datetime import datetime

from sqlalchemy import func
from sqlalchemy.orm import mapped_column, Mapped

from models.BaseModel import EntityMeta


class User(EntityMeta):
    __tablename__ = "user"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    firstname: Mapped[str]
    middlename: Mapped[str]
    lastname: Mapped[str]
    password: Mapped[str] = mapped_column()
    email: Mapped[str] = mapped_column(unique=True)
    phone: Mapped[str] = mapped_column(unique=True, nullable=True)
    created_at: Mapped[datetime] = mapped_column(default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        default=func.now(), onupdate=func.now(), nullable=False
    )
    preference: Mapped[str] = mapped_column(unique=True)
