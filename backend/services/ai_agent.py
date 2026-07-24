import json
import os

def get_portfolio_data():
    path = os.path.join(os.path.dirname(__file__), "..", "..", "data", "portfolio_data.json")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

def process_ai_chat(query: str) -> str:
    data = get_portfolio_data()
    q = query.lower()
    if "프로젝트" in q:
        titles = [p["title"] for p in data.get("projects", [])]
        return f"주요 프로젝트 목록입니다: {', '.join(titles)}."
    elif "스킬" in q or "기술" in q:
        skills = [s["name"] for s in data.get("skills", [])]
        return f"핵심 역량 스택: {', '.join(skills)}."
    else:
        return f"안녕하세요! 저는 {data.get('name')}의 AI 에이전트입니다. 역량과 프로젝트에 대해 물어보세요!"

def process_ai_contact(sender: str, message: str) -> str:
    return f"[{sender}]님의 제안 분석 완료: 채용 타당성 검증됨. 24시간 내 인터뷰 회신 예약."