import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/http";

export default function Navbar() {
  const navigate = useNavigate();
  async function onLogout() {
    try { await api.logout(); } catch {}
    navigate("/login");
  }

  return (
    <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #eee" }}>
      <Link to="/items">Itens</Link>
      <Link to="/history">Histórico</Link>
      <button onClick={onLogout} style={{ marginLeft: "auto" }}>Sair</button>
    </nav>
  );
}
