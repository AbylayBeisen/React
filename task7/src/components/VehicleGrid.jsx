import { motion } from "framer-motion";
import VehicleCard from "./VehicleCard";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

export default function VehicleGrid({ cars, onCarClick }) {
  const isOnline = useOnlineStatus();

  return (
    <div>
      {!isOnline && (
        <div
          role="status"
          style={{
            background: "rgba(30, 41, 59, 0.85)",
            border: "1px solid #38bdf8",
            color: "#e0f2fe",
            padding: "10px 14px",
            borderRadius: "10px",
            marginBottom: "16px",
            fontSize: "0.9rem",
          }}
        >
          Показаны кэшированные данные списка автомобилей (офлайн-режим).
        </div>
      )}

      <motion.div
        className="cars-grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {cars.map((car) => (
          <motion.div
            key={car.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <VehicleCard car={car} onClick={onCarClick} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}