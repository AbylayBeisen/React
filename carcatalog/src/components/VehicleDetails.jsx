export default function VehicleDetails({ car, onBack }) {
  if (!car) return null;

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={onBack} style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer' }}>
        Назад к списку
      </button>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '600px' }}>
        <h2>{car.brand} {car.model}</h2>
        <p><strong>Год выпуска:</strong> {car.year}</p>
        <p><strong>Категория:</strong> {car.category}</p>
        <p><strong>Максимальная скорость:</strong> {car.topSpeed} км/ч</p>
        <p><strong>Мощность:</strong> {car.hp} л.с.</p>
        <p><strong>ID в базе:</strong> {car.id}</p>
      </div>
    </div>
  );
}