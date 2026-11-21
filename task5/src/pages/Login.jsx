import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("auth_user");
    if (user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      localStorage.setItem("auth_user", username);
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_user");
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  if (isLoggedIn) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div style={{ background: "rgba(30, 41, 59, 0.7)", padding: "40px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.1)", width: "100%", maxWidth: "400px", color: "#f8fafc", textAlign: "center" }}>
          <h2 style={{ marginBottom: "20px" }}>Добро пожаловать, {username}!</h2>
          <button 
            onClick={handleLogout} 
            style={{ padding: "12px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", width: "100%" }}
          >
            Выйти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <form onSubmit={handleLogin} style={{ background: "rgba(30, 41, 59, 0.7)", padding: "40px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.1)", width: "100%", maxWidth: "400px", color: "#f8fafc" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Вход в систему</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input 
            required 
            type="text" 
            placeholder="Логин" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #334155", background: "#0f172a", color: "white", outline: "none" }} 
          />
          <input 
            required 
            type="password" 
            placeholder="Пароль" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #334155", background: "#0f172a", color: "white", outline: "none" }} 
          />
          <button type="submit" style={{ padding: "12px", background: "#3b82f6", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", marginTop: "10px" }}>
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}