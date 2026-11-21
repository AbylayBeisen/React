import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) return setError("Пароли не совпадают");
    try { setError(""); setLoading(true); await signup(email, password); navigate("/profile"); } 
    catch (err) { setError("Ошибка регистрации: " + err.message); setLoading(false); }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <form onSubmit={handleSignup} style={{ background: "rgba(30, 41, 59, 0.7)", padding: "40px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.1)", width: "100%", maxWidth: "400px", color: "#f8fafc" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Регистрация</h2>
        {error && <div style={{ background: "#f87171", padding: "10px", borderRadius: "8px", marginBottom: "20px" }}>{error}</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "12px", borderRadius: "8px", background: "#0f172a", color: "white", outline: "none", border: "1px solid #334155" }} />
          <input required type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "12px", borderRadius: "8px", background: "#0f172a", color: "white", outline: "none", border: "1px solid #334155" }} />
          <input required type="password" placeholder="Подтвердите пароль" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} style={{ padding: "12px", borderRadius: "8px", background: "#0f172a", color: "white", outline: "none", border: "1px solid #334155" }} />
          <button disabled={loading} type="submit" style={{ padding: "12px", background: "#10b981", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Зарегистрироваться</button>
        </div>
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>Уже есть аккаунт? <Link to="/login" style={{ color: "#60a5fa" }}>Войти</Link></p>
      </form>
    </div>
  );
}