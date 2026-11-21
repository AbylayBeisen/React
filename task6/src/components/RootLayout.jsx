import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./NavBar.jsx";

export default function RootLayout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar />
      <Toaster 
        position="bottom-right" 
        toastOptions={{ 
          style: { 
            background: '#1e293b', 
            color: '#f8fafc', 
            border: '1px solid #334155' 
          } 
        }} 
      />
      <main style={{ padding: "20px", flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}