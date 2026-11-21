import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./components/RootLayout.jsx";
import Home from "./pages/Home.jsx";
const About = React.lazy(() => import("./pages/About.jsx"));
const CarsList = React.lazy(() => import("./pages/CarList.jsx"));
const CarDetailsPage = React.lazy(() => import("./pages/CarDetailsPage.jsx"));
const Dashboard = React.lazy(() => import("./pages/Dashboard.jsx"));
const Login = React.lazy(() => import("./pages/Login.jsx"));
const Garage = React.lazy(() => import("./pages/Garage.jsx"));
const NotFound = React.lazy(() => import("./pages/NotFound.jsx"));

const FallbackLoader = () => (
  <div style={{ textAlign: "center", padding: "50px", color: "var(--primary)" }}>
    Загрузка страницы...
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<FallbackLoader />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />           
            <Route path="items" element={<CarsList />} />
            <Route path="items/:id" element={<CarDetailsPage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="garage" element={<Garage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}