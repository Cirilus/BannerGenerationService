import io
import uuid
from typing import Type, Sequence

from fastapi import Depends

from models.image import Image
from repositories.image import ImageRepository
from schemas.image import ImageCreateOpts, ImageListOpts, ImageResponse, ImageUpdateOpts
from services.minio import MinioService, bucket
from utils.types import MinioContentType


class ImageService:
    def __init__(
        self,
        minio_service: MinioService = Depends(MinioService),
        repo: ImageRepository = Depends(ImageRepository),
    ):
        self._repo = repo
        self._minio_service = minio_service
        self._path_to_save = "generated_images"
        self._bucket = bucket

    async def get(self, id: str) -> Type[Image]:
        image = await self._repo.get(id)
        return image

    async def create(self, opts: ImageCreateOpts) -> Image:
        """
        the path of the photo was generated as {base_path}/{path_from_user}/{id of the image}.png
        """
        id = uuid.uuid4()

        path = f"{self._path_to_save}/{opts.path}/{id}.png"

        self._minio_service.create_object(
            self._bucket, path, io.BytesIO(opts.file), MinioContentType.PNG
        )

        image = await self._repo.create(
            Image(
                id=id,
                path=path,
                is_successful=opts.is_successful,
                user=opts.user,
            )
        )

        return image

    async def get_image_url(self, id: uuid.UUID) -> str:
        image = await self._repo.get(id)

        url = self._minio_service.get_link(self._bucket, image.path)

        return url

    async def list(self, opts: ImageListOpts) -> Sequence[ImageResponse]:
        results = await self._repo.list(opts)

        response = [
            ImageResponse(
                id=result.id,
                path=result.path,
                is_successful=result.is_successful,
                created_at=result.created_at,
                updated_at=result.updated_at,
                user=result.user,
                link=await self.get_image_url(result.id),
            )
            for result in results
        ]

        return response

    async def update(self, id: uuid.UUID, opts: ImageUpdateOpts) -> ImageResponse:
        result = await self._repo.update(id, opts)

        return ImageResponse(
            id=result.id,
            path=result.path,
            is_successful=result.is_successful,
            created_at=result.created_at,
            updated_at=result.updated_at,
            user=result.user,
            link=await self.get_image_url(result.id),
        )
