import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import { api } from "../api/http";

export default function History() {
  const [search] = useSearchParams();
  const initialId = search.get("itemId") || "";
  const [itemId, setItemId] = useState(initialId);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchHistory(id) {
    setError("");
    setLoading(true);
    try {
      const data = await api.history(id);
      setRows(data);
    } catch (e) {
      setError("Erro ao consultar histórico.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (initialId) fetchHistory(initialId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialId]);

  function onSubmit(e) {
    e.preventDefault();
    if (!itemId.trim()) return setError("Informe o ID do item.");
    fetchHistory(itemId.trim());
  }

  return (
    <Layout>
      <div className="card">
        <h2 className="mb-2">Histórico de Movimentações</h2>

        <form onSubmit={onSubmit} className="mb-2">
          <label htmlFor="itemId" className="mb-1">ID do item:</label>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input
              id="itemId"
              className="input"
              placeholder="Ex: 1"
              value={itemId}
              onChange={e => setItemId(e.target.value)}
              style={{ maxWidth: "200px" }}
            />
            <button className="btn" disabled={loading}>
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </form>

        {error && <p style={{ color: "#b91c1c", marginBottom: "1rem" }}>{error}</p>}

        {loading ? (
          <div className="center"><div className="spinner"></div></div>
        ) : rows.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>ID</th><th>Tipo</th><th>Qtd</th><th>Saldo após</th>
                  <th>Usuário</th><th>Data</th><th>Nota</th>
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
        ) : (
          !error && <p className="center mt-2">Nenhuma movimentação encontrada.</p>
        )}
      </div>
    </Layout>
  );
}
