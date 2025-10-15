import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { api } from "../api/http";
import { Link } from "react-router-dom";

export default function Items() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await api.listItems();
      setItems(data);
    } catch (e) {
      setError("Erro ao carregar itens.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function onCreate(e) {
    e.preventDefault();
    if (!name.trim()) { setError("Informe o nome do item."); return; }
    setSaving(true);
    setError("");
    try {
      await api.createItem({ name, sku });
      setName("");
      setSku("");
      await load();
    } catch (e) {
      setError(e.message || "Erro ao criar item.");
    } finally {
      setSaving(false);
    }
  }

  async function move(itemId, type, amount) {
    try {
      await api.move({ itemId, type, amount, note: type === "IN" ? "Entrada rápida" : "Saída rápida" });
      await load();
    } catch (e) {
      alert(e.message || "Erro ao movimentar");
    }
  }

  return (
    <Layout>
      <div className="card">
        <h2 className="mb-2">Itens</h2>

        {/* Formulário de criação */}
        <form onSubmit={onCreate} className="mb-2">
          <div style={{ display: "grid", gap: "0.5rem", maxWidth: 500 }}>
            <input
              className="input"
              placeholder="Nome do item"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              className="input"
              placeholder="SKU (opcional)"
              value={sku}
              onChange={e => setSku(e.target.value)}
            />
            <div>
              <button className="btn" disabled={saving}>
                {saving ? "Salvando..." : "Adicionar item"}
              </button>
            </div>
          </div>
        </form>

        {error && <p style={{ color: "#b91c1c" }} className="mb-2">{error}</p>}

        {/* Lista de itens */}
        {loading ? (
          <div className="center"><div className="spinner"></div></div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>SKU</th>
                  <th>Quantidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map(it => (
                  <tr key={it.id}>
                    <td>{it.id}</td>
                    <td>{it.name}</td>
                    <td>{it.sku}</td>
                    <td>{it.quantity}</td>
                    <td>
                      <button className="btn" onClick={() => move(it.id, "IN", 1)}>+1</button>
                      <button
                        className="btn"
                        onClick={() => move(it.id, "OUT", 1)}
                        style={{ marginLeft: 8, backgroundColor: "#dc2626" }}
                      >
                        -1
                      </button>
                      <Link
                        className="btn"
                        style={{ marginLeft: 8, backgroundColor: "#374151" }}
                        to={`/history?itemId=${it.id}`}
                        title="Ver histórico"
                      >
                        Histórico
                      </Link>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan="5" className="center">Nenhum item cadastrado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
