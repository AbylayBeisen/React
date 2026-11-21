import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", color: "#f8fafc" }}>
      <h1 style={{ fontSize: "6rem", margin: "0", color: "#ef4444" }}>404</h1>
      <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>Страница не найдена</h2>
      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>Кажется, вы свернули не туда.</p>
      <Link to="/" style={{ padding: "10px 20px", background: "#3b82f6", color: "white", textDecoration: "none", borderRadius: "8px" }}>
        Вернуться на главную
      </Link>
    </div>
  );
}