from fastapi import APIRouter, Depends

from models.user import User
from schemas.user import UserResponse
from services.auth import authenticated

router = APIRouter(prefix="/api/v1/user", tags=["user"])


@router.get(
    "/me",
    summary="получение пользователя по токену",
    response_model=UserResponse,
)
async def get_me(
    user: User = Depends(authenticated),
):
    return user
