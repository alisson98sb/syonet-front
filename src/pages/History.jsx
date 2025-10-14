import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../api/http";

export default function History() {
  const [itemId, setItemId] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    if (!itemId) return;
    try {
      setRows(await api.history(itemId));
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => { if (itemId) load(); }, []); // carrega se vier pré-preenchido

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 800, margin: "24px auto" }}>
        <h2>Histórico</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <input placeholder="Item ID" value={itemId} onChange={e => setItemId(e.target.value)} />
          <button onClick={load}>Buscar</button>
        </div>
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        <table style={{ width: "100%", marginTop: 16, borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th align="left">ID</th>
              <th align="left">Tipo</th>
              <th align="left">Qtd</th>
              <th align="left">Saldo</th>
              <th align="left">Usuário</th>
              <th align="left">Quando</th>
              <th align="left">Nota</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.type}</td>
                <td>{r.amount}</td>
                <td>{r.balanceAfter}</td>
                <td>{r.userId ?? "-"}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
                <td>{r.note ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
