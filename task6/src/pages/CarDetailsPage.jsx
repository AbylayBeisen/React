import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItem } from "../services/fakeApi.js";
import VehicleDetails from "../components/VehicleDetails.jsx";

export default function CarDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

    getItem(id)
      .then((data) => {
        if (!ignore) {
          setCar(data);
          setIsLoading(false);
          
          const saved = JSON.parse(localStorage.getItem("garage_favorites") || "[]");
          setIsFavorite(saved.some(c => String(c.id) === String(data.id)));
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("garage_favorites") || "[]");
    if (isFavorite) {
      const updated = saved.filter(c => String(c.id) !== String(car.id));
      localStorage.setItem("garage_favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      saved.push(car);
      localStorage.setItem("garage_favorites", JSON.stringify(saved));
      setIsFavorite(true);
    }
  };

  if (isLoading) return <p style={{ color: "#f8fafc", padding: "20px", textAlign: "center" }}>Загрузка...</p>;
  if (error) return <p style={{ color: "#ef4444", padding: "20px", textAlign: "center" }}>Ошибка: {error}</p>;
  if (!car) return <p style={{ color: "#f8fafc", padding: "20px", textAlign: "center" }}>Автомобиль не найден</p>;

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "20px" }}>
        <button 
          onClick={toggleFavorite}
          style={{
            padding: "12px 24px",
            background: isFavorite ? "#ef4444" : "#10b981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)"
          }}
        >
          {isFavorite ? "Удалить из Гаража" : "Добавить в Гараж"}
        </button>
      </div>
      <VehicleDetails 
        car={car} 
        onBack={() => navigate(-1)} 
      />
    </div>
  );
}