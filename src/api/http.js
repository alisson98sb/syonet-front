const API = process.env.REACT_APP_API || "http://localhost:8081";

export async function fetchJson(path, { method = "GET", body, headers = {} } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include", // envia/recebe JSESSIONID
  });

  // tenta JSON; se não der, retorna texto
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!res.ok) {
    const msg = (data && data.message) || data || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

// atalhos
export const api = {
  // auth
  register: (p) => fetchJson("/auth/register", { method: "POST", body: p }),
  login: (p) => fetchJson("/auth/login", { method: "POST", body: p }),
  me: () => fetchJson("/auth/me"),
  logout: () => fetchJson("/auth/logout", { method: "POST" }),

  // users (se precisar na UI depois)
  users: () => fetchJson("/users"),

  // items
  listItems: () => fetchJson("/items"),
  createItem: (p) => fetchJson("/items", { method: "POST", body: p }),

  // movements
  move: (p) => fetchJson("/movements", { method: "POST", body: p }),
  history: (itemId) => fetchJson(`/movements?itemId=${itemId}`),
};
