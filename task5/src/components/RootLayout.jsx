import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";

export default function RootLayout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar />
      <main style={{ padding: "20px", flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}