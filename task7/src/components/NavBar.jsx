import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";

export default function NavBar() {
  const { currentUser, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinkStyle = ({ isActive }) => ({ 
    color: isActive ? "#3b82f6" : (isDarkMode ? "#f8fafc" : "#1e293b"), 
    textDecoration: "none", 
    fontWeight: "bold" 
  });

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "15px 30px", background: isDarkMode ? "#0f172a" : "#ffffff", borderBottom: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`, alignItems: "center" }}>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <NavLink to="/" style={navLinkStyle}>Главная</NavLink>
        <NavLink to="/items" style={navLinkStyle}>Каталог</NavLink>
        <NavLink to="/dashboard" style={navLinkStyle}>Дашборд</NavLink>
        <NavLink to="/garage" style={navLinkStyle}>Гараж</NavLink>
        <NavLink to="/about" style={navLinkStyle}>О проекте</NavLink>
      </div>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <motion.button 
          onClick={toggleTheme} 
          whileTap={{ scale: 0.8, rotate: 180 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "1.3rem" }}
          title="Сменить тему"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </motion.button>

        {currentUser ? (
          <>
            <span style={{ color: "#94a3b8", fontSize: "14px" }}>{currentUser.email}</span>
            <NavLink to="/profile" style={navLinkStyle}>Профиль</NavLink>
            <button onClick={handleLogout} style={{ padding: "8px 16px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Выйти</button>
          </>
        ) : (
          <>
            <NavLink to="/login" style={navLinkStyle}>Вход</NavLink>
            <NavLink to="/signup" style={{ padding: "8px 16px", background: "#10b981", color: "white", textDecoration: "none", borderRadius: "8px", fontWeight: "bold" }}>Регистрация</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}