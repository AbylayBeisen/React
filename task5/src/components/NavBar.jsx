import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav style={{ display: "flex", gap: "15px", padding: "15px", background: "#1e293b", borderBottom: "1px solid #334155" }}>
      <NavLink to="/" style={{ color: "white", textDecoration: "none" }}>Главная</NavLink>
      <NavLink to="/items" style={{ color: "white", textDecoration: "none" }}>Каталог</NavLink>
      <NavLink to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Дашборд</NavLink>
      <NavLink to="/garage" style={{ color: "white", textDecoration: "none" }}>Гараж</NavLink>
      <NavLink to="/about" style={{ color: "white", textDecoration: "none" }}>О проекте</NavLink>
      <NavLink to="/login" style={{ color: "white", textDecoration: "none", marginLeft: "auto" }}>Вход</NavLink>
    </nav>
  );
}