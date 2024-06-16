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
    firstname: str
    middlename: str
    lastname: str
    password: str
    email: str
    phone: str | None = None
    preference: str


class UserResponse(BaseModel):
    id: uuid.UUID
    email: str
    phone: str
