import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <div style={{ background: "rgba(30, 41, 59, 0.7)", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "400px", color: "#f8fafc", textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px" }}>Профиль пользователя</h2>
        <div style={{ background: "#0f172a", padding: "20px", borderRadius: "8px", marginBottom: "30px", textAlign: "left" }}>
          <p><strong>Email:</strong> {currentUser?.email}</p>
          <p style={{ fontSize: "14px", color: "#94a3b8", wordBreak: "break-all" }}><strong>UID:</strong> {currentUser?.uid}</p>
        </div>
        <button onClick={handleLogout} style={{ padding: "12px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", width: "100%", fontWeight: "bold" }}>Выйти</button>
      </div>
    </div>
  );
}