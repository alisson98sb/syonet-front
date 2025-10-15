import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicLayout from "../components/PublicLayout";
import { api } from "../api/http";

export default function Register() {
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@a.com");
  const [password, setPassword] = useState("123");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(""); setLoading(true);
    try {
      await api.register({ name, email, password });
      setMsg("Usuário registrado! Agora faça login.");
      setTimeout(() => navigate("/login"), 800);
    } catch (e) {
      setMsg(e.message || "Erro no registro");
    } finally { setLoading(false); }
  }

  return (
    <PublicLayout title="Criar conta">
      <form onSubmit={onSubmit} className="form-grid">
        {msg && <p className="form-help">{msg}</p>}
        <input className="input" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn" disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
      <p className="form-help mt-2">
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </PublicLayout>
  );
}
