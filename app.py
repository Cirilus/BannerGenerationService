import sys

from fastapi import FastAPI
from loguru import logger
from starlette.middleware.cors import CORSMiddleware

from configs.Environment import get_environment_variables
from errors.handlers import init_exception_handlers

from routing.v1.image import router as image_router
from routing.v1.user import router as user_router
from routing.v1.auth import router as auth_router
from routing.v1.ml import router as ml_router

app = FastAPI(openapi_url="/core/openapi.json", docs_url="/core/docs")

init_exception_handlers(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins="https://84.38.185.14.sslip.io",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


env = get_environment_variables()

if not env.DEBUG:
    logger.remove()
    logger.add(sys.stdout, level="INFO")

app.include_router(image_router)
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(ml_router)
