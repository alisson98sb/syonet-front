import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/http";

export default function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await api.logout();
      navigate("/login");
    } catch (e) {
      console.error("Erro ao sair:", e);
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/items">Itens</Link>
        <Link to="/history">Histórico</Link>
      </div>
      <div>
        <button className="btn" onClick={handleLogout}>Sair</button>
      </div>
    </header>
  );
}
