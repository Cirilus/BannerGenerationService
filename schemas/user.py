import uuid

from pydantic import BaseModel


class UserRepoListOpts(BaseModel):
    email: str | None = None
    password: str | None = None
    offset: int = 0
    limit: int = 100


class UserServiceListOpts(BaseModel):
    email: str | None = None
    password: str | None = None
    offset: int = 0
    limit: int = 100


class UserServiceCreateOpts(BaseModel):
    firstname: str | None = None
    middlename: str | None = None
    lastname: str | None = None
    password: str
    email: str
    phone: str | None = None
    preference: str | None = None


class UserResponse(BaseModel):
    id: uuid.UUID
    email: str
    phone: str
