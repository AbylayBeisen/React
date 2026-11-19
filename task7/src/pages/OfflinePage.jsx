import { useNavigate } from "react-router-dom";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

export default function OfflinePage() {
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();

  const handleRetry = () => {
    if (navigator.onLine) {
      navigate(-1);
    } else {
      window.location.reload();
    }
  };

  return (
    <section
      style={{
        maxWidth: "520px",
        margin: "48px auto",
        padding: "28px 20px",
        textAlign: "center",
        borderRadius: "12px",
        backgroundColor: "#1e293b",
        color: "#f8fafc",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "12px" }}>
        Вы находитесь в офлайне
      </h1>
      <p style={{ lineHeight: 1.5, color: "#cbd5e1", marginBottom: "20px" }}>
        Не удалось загрузить страницу из сети. 
      </p>
      <p style={{ fontSize: "14px", marginBottom: "24px" }}>
        Текущий статус: <strong>{isOnline ? "Онлайн" : "Офлайн"}</strong>
      </p>
      <button
        type="button"
        onClick={handleRetry}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#0284c7",
          color: "#ffffff",
          fontWeight: "600",
          cursor: "pointer",
          minHeight: "44px",
        }}
      >
        Повторить подключение
      </button>
    </section>
  );
}