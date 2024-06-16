from fastapi import APIRouter

from pipeline import llama3_pipeline
from schemas import StatusCode, CreateBannersRequest, CreateBannersResponse

router = APIRouter(prefix="/api/v1", tags=["llm"])


@router.get("/", response_model=StatusCode)
def status():
    return {"code": 200, "status": "service is UP"}


@router.get("/healthcheck", response_model=StatusCode)
def healthcheck():
    return {"code": 200, "status": "OK"}


@router.post("/create_banner", response_model=CreateBannersResponse)
def create_banner(req: CreateBannersRequest):
    response = llama3_pipeline(
        content=req.content,
        extra_content=req.extra_content,
        width=req.width,
        height=req.height,
    )

    return CreateBannersResponse(**response)
