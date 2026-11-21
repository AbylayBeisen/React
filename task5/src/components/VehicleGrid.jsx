import VehicleCard from './VehicleCard';

export default function VehicleGrid({ cars, onCarClick }) {
  return (
    <div className="cars-grid">
      {cars.map((car) => (
        <VehicleCard 
          key={car.id} 
          car={car} 
          onClick={onCarClick} 
        />
      ))}
    </div>
  );
}