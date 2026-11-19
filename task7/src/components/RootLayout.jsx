import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./NavBar.jsx";
import UpdatePrompt from "./UpdatePrompt.jsx";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

export default function RootLayout() {
  const isOnline = useOnlineStatus();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      <NavBar />

      {!isOnline && (
        <div
          role="status"
          style={{
            backgroundColor: "#7c2d12",
            color: "#ffedd5",
            padding: "8px 16px",
            textAlign: "center",
            fontSize: "14px",
            borderBottom: "1px solid #9a3412",
          }}
        >
          Hет подключения к интернету. 
        </div>
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#f8fafc",
            border: "1px solid #334155",
          },
        }}
      />

      <main style={{ padding: "16px", flex: 1 }}>
        <Outlet />
      </main>

      <UpdatePrompt />
    </div>
  );
}