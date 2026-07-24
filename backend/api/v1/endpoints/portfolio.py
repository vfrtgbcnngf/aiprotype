from fastapi import APIRouter
import json
import os

router = APIRouter()

@router.get("/portfolio")
async def portfolio_endpoint():
    # 현재 파일 기준이 아닌, backend 루트 폴더를 기준으로 data/portfolio_data.json 경로 설정
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    path = os.path.join(base_dir, "data", "portfolio_data.json")
    
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}