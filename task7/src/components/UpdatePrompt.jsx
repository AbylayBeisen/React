import { useEffect, useState } from "react";

export default function UpdatePrompt() {
  const [waitingWorker, setWaitingWorker] = useState(null);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const swUrl = `${import.meta.env.BASE_URL}sw.js`;

    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        if (registration.waiting) {
          setWaitingWorker(registration.waiting);
          setShowUpdateBanner(true);
        }

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setWaitingWorker(newWorker);
              setShowUpdateBanner(true);
            }
          });
        });
      })
      .catch((err) => {
        console.error("Ошибка регистрации Service Worker:", err);
      });

    let refreshing = false;
    const handleControllerChange = () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      handleControllerChange
    );

    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange
      );
    };
  }, []);

  const handleUpdateClick = () => {
    if (!waitingWorker) return;
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
    setShowUpdateBanner(false);
  };

  if (!showUpdateBanner) return null;

  return (
    <div
      role="alert"
      style={{
        position: "fixed",
        bottom: "16px",
        left: "16px",
        right: "16px",
        maxWidth: "480px",
        margin: "0 auto",
        zIndex: 9999,
        backgroundColor: "#0f172a",
        color: "#f8fafc",
        border: "1px solid #38bdf8",
        borderRadius: "10px",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
      }}
    >
      <span style={{ fontSize: "14px" }}>
        Доступна новая версия приложения.
      </span>
      <button
        type="button"
        onClick={handleUpdateClick}
        style={{
          backgroundColor: "#0284c7",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          padding: "8px 14px",
          fontWeight: "600",
          cursor: "pointer",
          minHeight: "40px",
          flexShrink: 0,
        }}
      >
        Обновить
      </button>
    </div>
  );
}