
import httpx
from fastapi import Depends

from configs.Environment import get_environment_variables
from schemas.ml import (
    CreateBannersRequest,
    CreateBannersTextResponse,
    CreateBannersResponse,
)
from utils.httpx_client import get_httpx_client


class MlService:
    def __init__(self, http_client: httpx.AsyncClient = Depends(get_httpx_client)):
        self._client = http_client
        config = get_environment_variables()

        self._llm_host = config.LLM_HOST
        self._llm_base_url = f"http://{self._llm_host}/api/v1"

        self._sd_host = config.SD_HOST
        self._sd_base_url = f"http://{self._sd_host}/api/v1"

    async def create_banner_text(
        self, req: CreateBannersRequest
    ) -> CreateBannersTextResponse:
        resp = await self._client.post(
            f"{self._llm_base_url}/create_banner", json=req.model_dump()
        )
        resp_json = resp.json()

        banners = CreateBannersTextResponse(**resp_json)

        return banners

    async def create_banner_image(
        self, req: CreateBannersRequest, banner_text: CreateBannersTextResponse
    ) -> CreateBannersResponse:
        resp = await self._client.post(
            f"{self._sd_base_url}/create_image",
            json={
                "content": req.content,
                "banner": banner_text.model_dump(by_alias=True),
                "width": req.width,
                "height": req.height,
                "law_text": req.law_text,
                "photo_style": req.photo_style,
            },
        )
        images = resp.json()

        images = CreateBannersResponse(**images)

        return images

    async def create_banner(self, req: CreateBannersRequest) -> CreateBannersResponse:
        banner_text = await self.create_banner_text(req)

        images = await self.create_banner_image(req, banner_text)

        return images
