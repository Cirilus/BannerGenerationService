from typing import List

from pydantic import BaseModel, Field


class CreateBannersRequest(BaseModel):
    content: str
    extra_content: str
    law_text: str
    width: int
    height: int
    photo_style: str


class LogoCoordinates(BaseModel):
    x: int
    y: int
    width: int
    height: int


class Logo(BaseModel):
    coordinates: LogoCoordinates


class TextCoordinates(BaseModel):
    x: int
    y: int


class TextStyle(BaseModel):
    font_size: int = Field(alias="font-size")
    color: str


class Texts(BaseModel):
    text: str
    coordinates: TextCoordinates
    style: TextStyle


class CreateBannersTextResponse(BaseModel):
    service: str
    background_color: List[int]
    logo: Logo
    texts: List[Texts]


class CreateBannersResponse(BaseModel):
    images: list[str]
