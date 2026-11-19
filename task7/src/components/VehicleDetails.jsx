import { useOnlineStatus } from "../hooks/useOnlineStatus";

export default function VehicleDetails({ car, onBack }) {
  const isOnline = useOnlineStatus();

  if (!car) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "800px", marginBottom: "16px" }}>
        <button
          onClick={onBack}
          style={{
            padding: "10px 20px",
            minHeight: "44px",
            background: "rgba(51, 65, 85, 0.6)",
            color: "#f8fafc",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "rgba(71, 85, 105, 0.8)";
            e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "rgba(51, 65, 85, 0.6)";
            e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
          }}
        >
          ← Назад к списку
        </button>

        {!isOnline && (
          <div
            role="status"
            style={{
              background: "rgba(30, 41, 59, 0.85)",
              border: "1px solid #38bdf8",
              color: "#e0f2fe",
              padding: "10px 14px",
              borderRadius: "10px",
              marginTop: "12px",
              fontSize: "0.9rem",
            }}
          >
            Показаны кэшированные данные автомобиля (офлайн-режим).
          </div>
        )}
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          background: "rgba(30, 41, 59, 0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "clamp(200px, 45vw, 350px)",
            background: "#0f172a",
          }}
        >
          {car.image ? (
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #1e293b, #0f172a)",
                color: "#60a5fa",
                fontWeight: "600",
                fontSize: "1.35rem",
                gap: "8px",
              }}
            >
              <span>KBTU Project</span>
              <span style={{ fontSize: "0.95rem", color: "#94a3b8" }}>
                Студенческая разработка
              </span>
            </div>
          )}
        </div>

        <div style={{ padding: "clamp(16px, 4vw, 30px)" }}>
          <h2
            style={{
              marginTop: 0,
              marginBottom: "20px",
              fontSize: "clamp(1.4rem, 5vw, 2.2rem)",
              color: "#f8fafc",
              fontWeight: "700",
              wordBreak: "break-word",
            }}
          >
            {car.brand} {car.model}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "12px",
            }}
          >
            <div
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <p style={{ margin: "0 0 5px 0", color: "#94a3b8", fontSize: "0.85rem" }}>
                Год выпуска
              </p>
              <p style={{ margin: 0, fontSize: "1.15rem", fontWeight: "600" }}>
                {car.year}
              </p>
            </div>
            <div
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <p style={{ margin: "0 0 5px 0", color: "#94a3b8", fontSize: "0.85rem" }}>
                Категория
              </p>
              <p style={{ margin: 0, fontSize: "1.15rem", fontWeight: "600" }}>
                {car.category}
              </p>
            </div>
            <div
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <p style={{ margin: "0 0 5px 0", color: "#94a3b8", fontSize: "0.85rem" }}>
                Макс. скорость
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "1.15rem",
                  fontWeight: "600",
                  color: "#60a5fa",
                }}
              >
                {car.topSpeed} км/ч
              </p>
            </div>
            <div
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <p style={{ margin: "0 0 5px 0", color: "#94a3b8", fontSize: "0.85rem" }}>
                Мощность
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "1.15rem",
                  fontWeight: "600",
                  color: "#c084fc",
                }}
              >
                {car.hp} л.с.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "20px",
              textAlign: "right",
              color: "#64748b",
              fontSize: "0.85rem",
            }}
          >
            ID в базе: {car.id}
          </div>
        </div>
      </div>
    </div>
  );
}