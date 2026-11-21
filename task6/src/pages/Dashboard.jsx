import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import NewCarForm from "../components/NewCarForm.jsx";
import Header from "../components/Header.jsx";
import { getItemsList } from "../services/fakeApi.js";
import { useTheme } from "../contexts/ThemeContext.jsx";

const fakeAddCarToServer = async (newCar) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(newCar), 1000);
  });
};

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { isDarkMode } = useTheme();
  const [showForm, setShowForm] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: ["cars"],
    queryFn: () => getItemsList(""),
  });

  const cars = data?.data || [];
  const totalCars = cars.length;
  const avgSpeed = totalCars ? Math.round(cars.reduce((acc, car) => acc + (car.topSpeed || 0), 0) / totalCars) : 0;
  const avgHp = totalCars ? Math.round(cars.reduce((acc, car) => acc + (car.hp || 0), 0) / totalCars) : 0;

  const addCarMutation = useMutation({
    mutationFn: fakeAddCarToServer,
    onMutate: async (newCar) => {
      await queryClient.cancelQueries({ queryKey: ["cars"] });
      const previousCarsCache = queryClient.getQueryData(["cars"]);
      
      queryClient.setQueryData(["cars"], (old) => {
        if (!old || !old.data) return { data: [newCar], totalPages: 1 };
        return { ...old, data: [newCar, ...old.data] };
      });
      
      setShowForm(false);
      toast.success("Автомобиль успешно добавлен!");
      
      return { previousCarsCache };
    },
    onError: (err, newCar, context) => {
      toast.error("Ошибка при добавлении автомобиля");
      if (context?.previousCarsCache) {
        queryClient.setQueryData(["cars"], context.previousCarsCache);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  const handleRefreshCache = () => {
    queryClient.invalidateQueries({ queryKey: ["cars"] });
    toast.success("Статистика и кэш обновлены!");
  };

  const cardStyle = {
    background: isDarkMode ? "rgba(30, 41, 59, 0.7)" : "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
    color: isDarkMode ? "#f8fafc" : "#1e293b",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
    >
      <Header onAddClick={() => setShowForm(true)} />
      
      <div style={{ padding: "30px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "inherit", margin: 0 }}>Аналитика каталога</h2>
          <button 
            onClick={handleRefreshCache}
            disabled={isFetching}
            style={{ padding: "8px 16px", background: "#3b82f6", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", opacity: isFetching ? 0.7 : 1 }}
          >
            {isFetching ? "Обновление..." : "Обновить"}
          </button>
        </div>
        
        <motion.div 
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" }}
          key={totalCars} 
          initial={{ scale: 0.98, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div style={cardStyle}>
            <p style={{ margin: "0 0 10px 0", color: "#94a3b8" }}>Всего автомобилей</p>
            <h3 style={{ margin: 0, fontSize: "2rem", color: "#3b82f6" }}>{totalCars}</h3>
          </div>
          <div style={cardStyle}>
            <p style={{ margin: "0 0 10px 0", color: "#94a3b8" }}>Средняя макс. скорость</p>
            <h3 style={{ margin: 0, fontSize: "2rem", color: "#10b981" }}>{avgSpeed} км/ч</h3>
          </div>
          <div style={cardStyle}>
            <p style={{ margin: "0 0 10px 0", color: "#94a3b8" }}>Средняя мощность</p>
            <h3 style={{ margin: 0, fontSize: "2rem", color: "#c084fc" }}>{avgHp} л.с.</h3>
          </div>
        </motion.div>

        <h3 style={{ color: "inherit", marginBottom: "15px" }}>Последние добавленные</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {cars.slice(0, 3).map((car) => (
            <div key={car.id} style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px" }}>
              <div>
                <strong>{car.brand} {car.model}</strong> ({car.year})
              </div>
              <span style={{ background: "#3b82f6", color: "white", padding: "4px 10px", borderRadius: "6px", fontSize: "0.85rem" }}>
                {car.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            transition={{ duration: 0.2 }}
          >
            <NewCarForm 
              onAdd={(data) => addCarMutation.mutate(data)} 
              onClose={() => setShowForm(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}