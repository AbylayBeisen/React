import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center", color: "#f8fafc" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Auto & Prototype Archive</h1>
      <p style={{ fontSize: "1.2rem", color: "#94a3b8", maxWidth: "600px", marginBottom: "40px" }}>
        Добро пожаловать в каталог автомобилей. Здесь вы можете найти классические модели, спорткары, гиперкары и уникальные прототипы.
      </p>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/items" style={{ padding: "12px 24px", background: "#3b82f6", color: "white", textDecoration: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "1.1rem" }}>
          Перейти в каталог
        </Link>
        <Link to="/dashboard" style={{ padding: "12px 24px", background: "rgba(30, 41, 59, 0.7)", color: "white", textDecoration: "none", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", fontWeight: "bold", fontSize: "1.1rem" }}>
          Статистика
        </Link>
      </div>
    </div>
  );
}