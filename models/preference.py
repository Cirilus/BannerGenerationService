import uuid

from sqlalchemy.orm import mapped_column, Mapped

from models.BaseModel import EntityMeta


class Preference(EntityMeta):
    __tablename__ = "preferences"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(unique=True)
    prompt: Mapped[str]
