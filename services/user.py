from typing import Sequence, Type

from fastapi import Depends
from loguru import logger

from models.user import User
from repositories.user import UserRepository
from schemas.user import (
    UserRepoListOpts,
    UserServiceListOpts,
    UserServiceCreateOpts,
)


class UserService:
    def __init__(self, repo: UserRepository = Depends(UserRepository)):
        self._repo = repo

    async def list(self, opts: UserServiceListOpts) -> Sequence[User]:
        logger.debug("User - Service - list")

        users = await self._repo.list(
            UserRepoListOpts(
                email=opts.email,
                password=opts.password,
                offset=opts.offset,
                limit=opts.limit,
            )
        )
        return users

    async def get(self, id: str) -> Type[User]:
        user = await self._repo.get(id)
        return user

    async def create(self, opts: UserServiceCreateOpts) -> User:
        logger.debug("User - Service - create")
        user = await self._repo.create(
            User(
                firstname=opts.firstname,
                middlename=opts.middlename,
                lastname=opts.lastname,
                password=opts.password,
                email=opts.email,
                phone=opts.phone,
                preference=opts.preference,
            )
        )

        return user
