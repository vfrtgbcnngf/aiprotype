const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://aiprotype-7.onrender.com";

export async function fetchPortfolio() {
  const res = await fetch(`${API_BASE_URL}/portfolio`);
  if (!res.ok) {
    throw new Error("포트폴리오 데이터를 불러오는데 실패했습니다.");
  }
  return res.json();
}

export async function runMenuAgent(menuId: number, prompt: string) {
  const res = await fetch(`${API_BASE_URL}/api/agent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ menu_id: menuId, prompt }),
  });
  
  if (!res.ok) {
    throw new Error("에이전트 요청에 실패했습니다.");
  }
  
  const data = await res.json();
  return data.result;
}
