from typing import Sequence, Type

from fastapi import Depends
from loguru import logger
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from configs.Database import get_db_connection
from models.user import User
from errors.errors import ErrEntityNotFound
from schemas.user import UserRepoListOpts


class UserRepository:
    def __init__(self, db: AsyncSession = Depends(get_db_connection)):
        self._db = db

    async def list(self, opts: UserRepoListOpts) -> Sequence[User]:
        logger.debug("User - Repository - list")

        query = select(User).offset(opts.offset).limit(opts.limit)

        if opts.email is not None:
            query = query.where(User.email == opts.email)

        if opts.password is not None:
            query = query.where(User.password == opts.password)

        result = await self._db.execute(query)
        return result.scalars().all()

    async def get(self, id: str) -> Type[User]:
        logger.debug("User - Repository - get")
        result = await self._db.get(User, id)

        if result is None:
            raise ErrEntityNotFound("entity not found")
        return result

    async def create(self, user: User) -> User:
        logger.debug("User - Repository - create")
        self._db.add(user)
        await self._db.commit()
        await self._db.refresh(user)
        return user

    async def delete(self, user: User) -> None:
        logger.debug("User - Repository - delete")
        await self._db.delete(user)
        await self._db.commit()
        await self._db.flush()
