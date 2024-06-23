from pydantic import BaseModel


class ListServiceOpts(BaseModel):
    offset: int = 0
    limit: int = 100


class PreferenceResponse(BaseModel):
    title: str
