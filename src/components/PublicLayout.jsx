export default function PublicLayout({ children, title = "Exemple App" }) {
  return (
    <div className="public-wrap">
      <div className="public-card">
        <h1 className="public-title">{title}</h1>
        {children}
      </div>
      <p className="public-foot">© {new Date().getFullYear()} Desafio Syonet</p>
    </div>
  );
}
