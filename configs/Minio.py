from minio import Minio
from configs.Environment import get_environment_variables

env = get_environment_variables()

bucket = "static"

minio_client = Minio(
    env.MINIO_HOST,
    access_key=env.MINIO_ACCESS,
    secret_key=env.MINIO_SECRET,
    secure=False,
)


def get_minio_client() -> Minio:
    yield minio_client
