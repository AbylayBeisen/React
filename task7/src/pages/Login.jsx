import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try { setError(""); setLoading(true); await login(email, password); navigate("/profile"); } 
    catch (err) { setError("Ошибка входа"); setLoading(false); }
  };

  const handleGoogleLogin = async () => {
    try { setError(""); setLoading(true); await loginWithGoogle(); navigate("/profile"); } 
    catch (err) { setError("Ошибка входа Google"); setLoading(false); }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <form onSubmit={handleLogin} style={{ background: "rgba(30, 41, 59, 0.7)", padding: "40px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.1)", width: "100%", maxWidth: "400px", color: "#f8fafc" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Вход</h2>
        {error && <div style={{ background: "#f87171", padding: "10px", borderRadius: "8px", marginBottom: "20px" }}>{error}</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "12px", borderRadius: "8px", background: "#0f172a", color: "white", outline: "none", border: "1px solid #334155" }} />
          <input required type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "12px", borderRadius: "8px", background: "#0f172a", color: "white", outline: "none", border: "1px solid #334155" }} />
          <button disabled={loading} type="submit" style={{ padding: "12px", background: "#3b82f6", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Войти</button>
        </div>
        <button type="button" disabled={loading} onClick={handleGoogleLogin} style={{ width: "100%", padding: "12px", background: "white", color: "#0f172a", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", marginTop: "15px" }}>Войти через Google</button>
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>Нет аккаунта? <Link to="/signup" style={{ color: "#60a5fa" }}>Создать</Link></p>
      </form>
    </div>
  );
}