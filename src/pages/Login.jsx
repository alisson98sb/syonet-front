import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/http";
import PublicLayout from "../components/PublicLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      await api.login({ email, password });
      navigate("/items");
    } catch (e) {
      setErr(e.message || "Falha no login");
    } finally { setLoading(false); }
  }

  return (
    <PublicLayout title="Acessar a conta">
      <form onSubmit={onSubmit} className="form-grid">
        {err && <div className="alert">{err}</div>}
        <label>
          <div className="mb-1">Email</div>
          <input className="input" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <div className="mb-1">Senha</div>
          <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button className="btn mt-1" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="form-help mt-2">
        Não tem conta? <Link to="/register">Criar conta</Link>
      </p>
    </PublicLayout>
  );
}
