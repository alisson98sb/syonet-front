import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/http";

export default function Login() {
  const [email, setEmail] = useState("admin@a.com");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.login({ email, password });
      navigate("/items");
    } catch (err) {
      setError(err.message || "Falha no login");
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: "64px auto" }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Entrar</button>
      </form>
      <hr />
      <RegisterQuick />
    </div>
  );
}

function RegisterQuick() {
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@a.com");
  const [password, setPassword] = useState("123");
  const [msg, setMsg] = useState("");

  async function onRegister(e) {
    e.preventDefault();
    setMsg("");
    try {
      await api.register({ name, email, password });
      setMsg("Usuário registrado! Agora faça login.");
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <>
      <h3>Registro rápido</h3>
      <form onSubmit={onRegister} style={{ display: "grid", gap: 8 }}>
        <input placeholder="nome" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Registrar</button>
      </form>
      {msg && <div style={{ marginTop: 8 }}>{msg}</div>}
    </>
  );
}
