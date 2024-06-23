from typing import Sequence

from fastapi import Depends
from loguru import logger
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from configs.Database import get_db_connection
from models.preference import Preference
from schemas.preference import ListServiceOpts


class PresenceRepository:
    def __init__(self, db: AsyncSession = Depends(get_db_connection)):
        self._db = db

    async def list(self, opts: ListServiceOpts) -> Sequence[Preference]:
        logger.debug("Services - Repository - list")

        query = select(Preference).offset(opts.offset).limit(opts.limit)

        result = await self._db.execute(query)
        return result.scalars().all()
