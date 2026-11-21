import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Garage() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("garage_favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const handleRemove = (e, id) => {
    e.stopPropagation();
    const updated = favorites.filter(car => car.id !== id);
    setFavorites(updated);
    localStorage.setItem("garage_favorites", JSON.stringify(updated));
  };

  return (
    <div>
      <h2 style={{ color: "#f8fafc", marginBottom: "20px" }}>Мой Гараж</h2>
      
      {favorites.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>
          В гараже пока пусто. <Link to="/items" style={{ color: "#3b82f6" }}>Перейти в каталог</Link>
        </p>
      ) : (
        <div>
          <p style={{ color: "#94a3b8", marginBottom: "20px" }}>Машин в гараже: {favorites.length}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {favorites.map(car => (
              <div 
                key={car.id} 
                onClick={() => navigate(`/items/${car.id}`)}
                style={{ 
                  background: "#0f172a", 
                  borderRadius: "16px", 
                  border: "1px solid rgba(255,255,255,0.1)", 
                  color: "#f8fafc", 
                  cursor: "pointer",
                  overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ height: "160px", width: "100%", background: "#1e293b" }}>
                  {car.image && (
                    <img 
                      src={car.image} 
                      alt={car.brand} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                  )}
                </div>
                <div style={{ padding: "20px" }}>
                  <h3 style={{ margin: "0 0 10px 0" }}>{car.brand} {car.model}</h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: "0 0 15px 0" }}>
                    Год: {car.year} | {car.hp} л.с. | {car.topSpeed} км/ч
                  </p>
                  <button 
                    onClick={(e) => handleRemove(e, car.id)}
                    style={{ 
                      padding: "10px", 
                      background: "rgba(239, 68, 68, 0.1)", 
                      color: "#ef4444", 
                      border: "1px solid rgba(239, 68, 68, 0.3)", 
                      borderRadius: "8px", 
                      cursor: "pointer", 
                      width: "100%",
                      fontWeight: "bold",
                      transition: "background 0.2s"
                    }}
                    onMouseOver={(e) => e.target.style.background = "#ef4444"}
                    onMouseOut={(e) => e.target.style.background = "rgba(239, 68, 68, 0.1)"}
                  >
                    Удалить из гаража
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}