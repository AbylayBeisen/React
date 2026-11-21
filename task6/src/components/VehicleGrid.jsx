import { motion } from "framer-motion";
import VehicleCard from './VehicleCard';

export default function VehicleGrid({ cars, onCarClick }) {
  return (
    <motion.div 
      className="cars-grid"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
    >
      {cars.map((car) => (
        <motion.div 
          key={car.id} 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <VehicleCard 
            car={car} 
            onClick={onCarClick} 
          />
        </motion.div>
      ))}
    </motion.div>
  );
}