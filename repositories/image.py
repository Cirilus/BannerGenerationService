import uuid

from sqlalchemy import select, update
from typing import Sequence
from fastapi import Depends
from loguru import logger
from sqlalchemy.ext.asyncio import AsyncSession
from configs.Database import get_db_connection
from errors.errors import ErrEntityNotFound
from models.image import Image
from schemas.image import ImageListOpts, ImageUpdateOpts


class ImageRepository:
    def __init__(self, db: AsyncSession = Depends(get_db_connection)):
        self._db = db

    async def create(self, image: Image) -> Image:
        logger.debug("Image - Repository - create")
        self._db.add(image)
        await self._db.commit()
        await self._db.refresh(image)
        return image

    async def get(self, id: uuid.UUID) -> Image:
        logger.debug("Image - Repository - get")
        result = await self._db.get(Image, id)

        if result is None:
            raise ErrEntityNotFound("entity not found")
        return result

    async def list(self, opts: ImageListOpts) -> Sequence[Image]:
        logger.debug("Image - Repository - list")

        query = select(Image).offset(opts.offset).limit(opts.limit)

        if opts.is_successful is not None:
            query = query.where(Image.is_successful == opts.is_successful)

        result = await self._db.execute(query)
        return result.scalars().all()

    async def update(self, id: uuid.UUID, opts: ImageUpdateOpts) -> Image:
        query = (
            update(Image)
            .where(Image.id == id)
            .values(
                {
                    field: value
                    for field, value in opts.model_dump().items()
                    if value is not None
                }
            )
            .returning(Image)
        )

        res = await self._db.execute(query)
        await self._db.commit()

        return res.scalars().one()
