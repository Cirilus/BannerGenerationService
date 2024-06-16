import io

from fastapi import Depends
from minio import Minio

from configs.Minio import get_minio_client, bucket
from utils.types import MinioContentType


class MinioService:
    def __init__(self, client: Minio = Depends(get_minio_client)):
        self._client = client
        self.create_bucket(bucket)

    def create_object(
        self,
        bucket_name: str,
        object_path: str,
        file: io.BytesIO,
        content_type: MinioContentType,
    ) -> str:
        self._client.put_object(
            bucket_name,
            object_path,
            data=file,
            length=file.getbuffer().nbytes,
            content_type=content_type.value,
        )

        return object_path

    def create_bucket(self, name: str):
        found = self._client.bucket_exists(name)
        if not found:
            self._client.make_bucket(name)

    def get_link(self, bucket_name: str, object_path: str) -> str:
        url = self._client.get_presigned_url("GET", bucket_name, object_path)

        return url
