import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/http";
import PublicLayout from "../components/PublicLayout";

export default function Login() {
  const [email, setEmail] = useState("admin@a.com");
  const [password, setPassword] = useState("123");
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
          <input
            className="input"
            placeholder="email@exemplo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
          />
        </label>

        <label>
          <div className="mb-1">Senha</div>
          <input
            className="input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        <button className="btn mt-1" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <hr className="mt-2 mb-2" />

      <RegisterQuick />
    </PublicLayout>
  );
}

function RegisterQuick() {
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@a.com");
  const [password, setPassword] = useState("123");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function onRegister(e) {
    e.preventDefault();
    setMsg(""); setLoading(true);
    try {
      await api.register({ name, email, password });
      setMsg("Usuário registrado! Agora faça login.");
    } catch (e) {
      setMsg(e.message || "Erro no registro");
    } finally { setLoading(false); }
  }

  return (
    <div>
      <h2 className="center mb-1" style={{fontSize: "1rem"}}>Registro rápido</h2>
      {msg && <p className="form-help mb-1">{msg}</p>}
      <form onSubmit={onRegister} className="form-grid">
        <input className="input" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn" disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
}
