from typing import List

from pydantic import BaseModel, Field


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


class Banner(BaseModel):
    service: str
    background_color: List[int]
    logo: Logo
    texts: List[Texts]


class CreateImageRequest(BaseModel):
    banner: Banner
    content: str
    law_text: str
    width: int
    height: int
    photo_style: str


class CreateImageWithoutTextRequest(BaseModel):
    content: str
    width: int
    height: int
    photo_style: str
