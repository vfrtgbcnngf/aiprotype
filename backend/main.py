import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv

load_dotenv()

# 환경 변수에서 GEMINI_API_KEY를 가져오도록 수정
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(title="TYPEAI.PRO API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/portfolio")
def get_portfolio():
    return {
        "name": "TYPEAI.PRO",
        "title": "Autonomous AI & Modular Architecture Specialist",
        "bio": "FastAPI 백엔드와 Next.js 프론트엔드가 결합된 고성능 AI 포트폴리오 에이전트 시스템입니다.",
        "skills": ["Python", "FastAPI", "TypeScript", "Next.js", "Google Gemini AI", "Tailwind CSS"],
    }

class AgentRequest(BaseModel):
    menu_id: int  # 1: Overview, 2: Architecture, 3: AI Chat, 4: Projects, 5: Optimizer
    prompt: str

@app.post("/api/agent")
def run_ai_agent(req: AgentRequest):
    try:
        instructions = {
            1: "너는 TYPEAI.PRO의 'System Overview' 에이전트야. 프로젝트의 가치와 철학을 명확하게 설명해줘.",
            2: "너는 'Architecture Designer'야. FastAPI와 Next.js 기반 모듈러 아키텍처 설계 및 데이터 흐름을 분석해줘.",
            3: "너는 TYPEAI.PRO의 'AI Assistant 챗봇'이야. 개발자의 기술 스택과 경력에 대해 답변해줘.",
            4: "너는 'Project Reviewer'야. 입력된 프로젝트 요구사항이나 구조를 검토해줘.",
            5: "너는 'AI Code Optimizer'야. 소스코드의 성능 병목을 찾고 클린 코드로 리팩토링해줘."
        }

        system_instruction = instructions.get(req.menu_id, "너는 고성능 AI 에이전트야.")

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f"{system_instruction}\n\n사용자 요청: {req.prompt}"
        )

        return {"status": "success", "result": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))