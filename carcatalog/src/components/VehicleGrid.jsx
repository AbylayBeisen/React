export default function VehicleGrid({ cars, onCarClick }) {
  return (
    <div style={{ padding: '10px', maxWidth: '1000px', margin: '0 auto' }}>
      {cars.map((car) => (
        <div 
          key={car.id} 
          style={{ border: '1px solid #000', margin: '5px 0', padding: '10px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}
        >
          <div style={{ width: '180px', flexShrink: 0 }}>
            {car.image ? (
              <img 
                src={car.image} 
                alt={`${car.brand} ${car.model}`} 
                style={{ maxWidth: '100%', height: 'auto', display: 'block' }} 
              />
            ) : (
              <div style={{ width: '100%', height: '120px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd' }}>
                Фото отсутствует
              </div>
            )}
          </div>
          
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '8px' }}>
              {car.brand} {car.model}
            </div>
            <div><u>Категория:</u> {car.category}</div>
            <div><u>Год выпуска:</u> {car.year}</div>
          </div>
          
          <div style={{ textAlign: 'right', flexShrink: 0, minWidth: '150px' }}>
            <div style={{ marginBottom: '10px' }}>
              Скорость: <strong>{car.topSpeed} км/ч</strong>
            </div>
            <button 
              onClick={() => onCarClick(car)}
              style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}
            >
              Подробнее
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}