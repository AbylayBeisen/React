import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./components/RootLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; 
import Home from "./pages/Home.jsx";

const About = React.lazy(() => import("./pages/About.jsx"));
const CarsList = React.lazy(() => import("./pages/CarList.jsx"));
// Убедись, что файл ниже реально называется VehicleDetails.jsx, а не CarDetailsPage.jsx
const VehicleDetails = React.lazy(() => import("./pages/CarDetailsPage.jsx")); 
const Dashboard = React.lazy(() => import("./pages/Dashboard.jsx"));
const Garage = React.lazy(() => import("./pages/Garage.jsx"));
const NotFound = React.lazy(() => import("./pages/NotFound.jsx"));
const Login = React.lazy(() => import("./pages/Login.jsx"));
const Signup = React.lazy(() => import("./pages/Signup.jsx"));
const Profile = React.lazy(() => import("./pages/Profile.jsx"));

const FallbackLoader = () => <div style={{ textAlign: "center", padding: "50px", color: "var(--primary)" }}>Загрузка...</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<FallbackLoader />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />           
            <Route path="items" element={<CarsList />} />
            <Route path="items/:id" element={<VehicleDetails />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="garage" element={<Garage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}