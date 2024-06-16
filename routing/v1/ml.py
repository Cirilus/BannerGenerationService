from fastapi import APIRouter, Depends

from models.user import User
from schemas.image import ImageCreateOpts
from schemas.ml import CreateBannersRequest, CreateBannersResponse
from services.auth import authenticated
from services.image import ImageService
from services.ml import MlService
from utils.utils import base64_to_bytes

router = APIRouter(prefix="/api/v1/ml", tags=["ml"])


@router.post(
    "/create_banner",
    summary="Создание баннера",
    response_model=CreateBannersResponse,
)
async def create_banner(
    req: CreateBannersRequest,
    user: User = Depends(authenticated),
    ml_service: MlService = Depends(),
    image_service: ImageService = Depends(),
):
    images = await ml_service.create_banner(req)
    for image in images.images:
        await image_service.create(
            ImageCreateOpts(
                file=base64_to_bytes(image),
                path=str(user.id),
                is_successful=None,
                user=user.id,
            )
        )

    return images
