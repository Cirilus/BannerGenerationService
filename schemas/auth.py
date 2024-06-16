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
    firstname: str
    middlename: str
    lastname: str
    password: str
    email: str
    phone: str | None = None
    preference: str


class UserRegisterResponse(BaseModel):
    id: UUID
    phone: str
    email: str
