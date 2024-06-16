import uuid

from fastapi import APIRouter, Response, Depends
from loguru import logger

from models.user import User
from schemas.image import ImageCreateOpts, ImageListOpts, ImageResponse, ImageUpdateOpts
from services.auth import authenticated
from services.image import ImageService

router = APIRouter(prefix="/api/v1/image", tags=["image"])


@router.post(
    "/generate_banner",
    summary="генерация изображения",
)
async def generate_image(
    user: User = Depends(authenticated), image_service: ImageService = Depends()
):
    logger.debug(f"user = {user}")
    with open("photo_2024-06-02_21-24-11.jpg", "rb") as file:
        image = file.read()

    await image_service.create(
        ImageCreateOpts(
            file=image,
            path="photo_2024-06-02_21-24-11.jpg",
            is_successful=None,
            user=user.id,
        )
    )

    return Response(content=image, media_type="image/png")


@router.get(
    "/link/{id}",
    summary="получение ссылки на изображения в S3",
)
async def get_image_link(
    id: uuid.UUID,
    user: User = Depends(authenticated),
    image_service: ImageService = Depends(),
):
    url = await image_service.get_image_url(id)

    return {"url": url}


@router.get(
    "",
    summary="list of the all images",
    response_model=list[ImageResponse],
)
async def list(
    is_successful: bool | None = None,
    offset: int = 0,
    limit: int = 100,
    image_service: ImageService = Depends(),
    user: User = Depends(authenticated),
):
    result = await image_service.list(
        opts=ImageListOpts(is_successful=is_successful, offset=offset, limit=limit)
    )

    return result


@router.patch(
    "/{id}",
    summary="update the image",
    response_model=ImageResponse,
)
async def update(
    id: uuid.UUID,
    opts: ImageUpdateOpts,
    image_service: ImageService = Depends(),
    user: User = Depends(authenticated),
):
    image = await image_service.update(id, opts)

    return image
