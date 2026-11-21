import { useState, useEffect } from "react";
import { getItemsList } from "../services/fakeApi.js";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    
    getItemsList("limit=1000")
      .then((res) => {
        if (!ignore) {
          const cars = res.data;
          const totalCars = cars.length;
          
          let maxHpCar = cars[0];
          let fastestCar = cars[0];
          let totalSpeed = 0;

          const categoryCount = cars.reduce((acc, car) => {
            const cat = car.category || "Другое";
            acc[cat] = (acc[cat] || 0) + 1;
            
            totalSpeed += (Number(car.topSpeed) || 0);
            
            if (Number(car.hp) > Number(maxHpCar?.hp || 0)) maxHpCar = car;
            if (Number(car.topSpeed) > Number(fastestCar?.topSpeed || 0)) fastestCar = car;

            return acc;
          }, {});

          setStats({
            totalCars,
            avgSpeed: Math.round(totalSpeed / (totalCars || 1)),
            categoryCount,
            maxHpCar,
            fastestCar
          });
          setIsLoading(false);
        }
      });

    return () => { ignore = true; };
  }, []);

  if (isLoading) return <p style={{ color: "#f8fafc", padding: "20px" }}>Загрузка аналитики...</p>;

  const cardStyle = { 
    background: "linear-gradient(145deg, rgba(30,41,59,0.9), rgba(15,23,42,0.9))", 
    padding: "25px", 
    borderRadius: "16px", 
    border: "1px solid rgba(255,255,255,0.05)", 
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  };

  return (
    <div style={{ color: "#f8fafc" }}>
      <h2 style={{ fontSize: "2.2rem", marginBottom: "30px", fontWeight: "700" }}>Аналитика автопарка</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
        
        <div style={cardStyle}>
          <h3 style={{ margin: 0, color: "#94a3b8", fontSize: "1.1rem", fontWeight: "500" }}>Всего машин</h3>
          <p style={{ fontSize: "3rem", color: "#3b82f6", margin: "10px 0 0 0", fontWeight: "800" }}>
             {stats.totalCars}
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={{ margin: 0, color: "#94a3b8", fontSize: "1.1rem", fontWeight: "500" }}>Средняя скорость</h3>
          <p style={{ fontSize: "3rem", color: "#10b981", margin: "10px 0 0 0", fontWeight: "800" }}>
             {stats.avgSpeed} <span style={{ fontSize: "1.2rem", color: "#64748b" }}>км/ч</span>
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={{ margin: 0, color: "#94a3b8", fontSize: "1.1rem", fontWeight: "500" }}>Рекорд скорости</h3>
          <p style={{ fontSize: "2.2rem", color: "#ef4444", margin: "10px 0 5px 0", fontWeight: "800" }}>
             {stats.fastestCar?.topSpeed} <span style={{ fontSize: "1rem", color: "#64748b" }}>км/ч</span>
          </p>
          <p style={{ margin: 0, color: "#cbd5e1", fontSize: "0.9rem" }}>
            {stats.fastestCar?.brand} {stats.fastestCar?.model}
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={{ margin: 0, color: "#94a3b8", fontSize: "1.1rem", fontWeight: "500" }}>Самый мощный</h3>
          <p style={{ fontSize: "2.2rem", color: "#f59e0b", margin: "10px 0 5px 0", fontWeight: "800" }}>
             {stats.maxHpCar?.hp} <span style={{ fontSize: "1rem", color: "#64748b" }}>л.с.</span>
          </p>
          <p style={{ margin: 0, color: "#cbd5e1", fontSize: "0.9rem" }}>
            {stats.maxHpCar?.brand} {stats.maxHpCar?.model}
          </p>
        </div>
        
      </div>

      <h3 style={{ marginTop: "50px", fontSize: "1.5rem", marginBottom: "20px" }}>Распределение по категориям</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "15px" }}>
        {Object.entries(stats.categoryCount).map(([cat, count]) => (
          <div key={cat} style={{ 
            background: "rgba(30,41,59,0.4)", 
            padding: "20px", 
            borderRadius: "12px", 
            border: "1px solid rgba(255,255,255,0.05)", 
            textAlign: "center"
          }}>
            <div style={{ color: "#94a3b8", marginBottom: "10px", fontSize: "0.95rem" }}>{cat}</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#f8fafc" }}>{count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}