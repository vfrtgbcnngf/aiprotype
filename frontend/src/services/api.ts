const API_BASE_URL = "http://localhost:8000";

export async function fetchPortfolio() {
  const res = await fetch(`${API_BASE_URL}/portfolio`);
  return res.json();
}

export async function runMenuAgent(menuId: number, prompt: string) {
  const res = await fetch(`${API_BASE_URL}/api/agent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ menu_id: menuId, prompt }),
  });
  const data = await res.json();
  return data.result;
}