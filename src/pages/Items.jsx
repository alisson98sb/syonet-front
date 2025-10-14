import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../api/http";

export default function Items() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [error, setError] = useState("");

  async function load() {
    try {
      setItems(await api.listItems());
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => { load(); }, []);

  async function onCreate(e) {
    e.preventDefault();
    setError("");
    try {
      await api.createItem({ name, sku });
      setName(""); setSku("");
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 800, margin: "24px auto" }}>
        <h2>Itens</h2>
        <form onSubmit={onCreate} style={{ display: "flex", gap: 8 }}>
          <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
          <input placeholder="SKU" value={sku} onChange={e => setSku(e.target.value)} />
          <button type="submit">Adicionar</button>
        </form>
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        <table style={{ width: "100%", marginTop: 16, borderCollapse: "collapse" }}>
          <thead>
            <tr><th align="left">ID</th><th align="left">Nome</th><th align="left">SKU</th><th align="left">Qtd</th><th></th></tr>
          </thead>
          <tbody>
            {items.map(it => (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{it.name}</td>
                <td>{it.sku}</td>
                <td>{it.quantity}</td>
                <td>
                  <button onClick={() => move(it.id, "IN", 1)}>+1</button>
                  <button onClick={() => move(it.id, "OUT", 1)} style={{ marginLeft: 6 }}>-1</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  async function move(itemId, type, amount) {
    try {
      await api.move({ itemId, type, amount, note: type === "IN" ? "Entrada rápida" : "Saída rápida" });
      await load();
    } catch (err) {
      alert(err.message);
    }
  }
}
