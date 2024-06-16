from fastapi import APIRouter

from pipeline import result_pipeline_llm
from schemas import CreateImageRequest
from util import pil_image_to_base64

router = APIRouter(prefix="/api/v1", tags=["sd"])


@router.post(
    "/create_image",
    summary="Создает картинку по промпту",
)
def create_image(req: CreateImageRequest):
    pil_images = result_pipeline_llm(
        req.content,
        req.banner.model_dump(by_alias=True),
        req.width,
        req.height,
        req.law_text,
    )

    base64_images = []
    for pil_image in pil_images:
        base64_image = pil_image_to_base64(pil_image)
        base64_images.append(base64_image)

    return {"images": base64_images}
