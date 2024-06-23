from uuid import UUID

from pydantic import BaseModel


class UserAuth(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: str
    email: str


class RegisterUserOpts(BaseModel):
    firstname: str | None = None
    middlename: str | None = None
    lastname: str | None = None
    password: str
    email: str
    phone: str | None = None
    preference: str | None = None


class UserRegisterResponse(BaseModel):
    id: UUID
    phone: str | None = None
    email: str
