from typing import List

from fastapi import APIRouter, Depends

from schemas.preference import PreferenceResponse, ListServiceOpts
from services.preference import PreferenceService

router = APIRouter(prefix="/api/v1/preference", tags=["preference"])


@router.get("/", response_model=List[PreferenceResponse])
async def list(
    limit: int, offset: int, preference_service: PreferenceService = Depends()
):
    result = await preference_service.list(ListServiceOpts(limit=limit, offset=offset))

    return result
