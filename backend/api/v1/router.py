from fastapi import APIRouter
from api.v1.endpoints import chat, portfolio

api_router = APIRouter()
api_router.include_router(portfolio.router, tags=["portfolio"])
api_router.include_router(chat.router, tags=["chat"])