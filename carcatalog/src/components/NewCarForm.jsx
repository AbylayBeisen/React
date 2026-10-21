import { useState } from 'react';

export default function NewCarForm({ onAdd, onClose }) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    category: 'Sports Car',
    topSpeed: '',
    hp: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      year: Number(formData.year),
      topSpeed: Number(formData.topSpeed),
      hp: Number(formData.hp)
    });
  };

  return (
    <div style={{ padding: '20px', margin: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Добавить новый автомобиль</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
        <input required name="brand" value={formData.brand} onChange={handleChange} placeholder="Бренд" style={{ padding: '8px' }} />
        <input required name="model" value={formData.model} onChange={handleChange} placeholder="Модель" style={{ padding: '8px' }} />
        <input required type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Год выпуска" style={{ padding: '8px' }} />
        <select name="category" value={formData.category} onChange={handleChange} style={{ padding: '8px' }}>
          <option value="Classic">Classic</option>
          <option value="Sports Car">Sports Car</option>
          <option value="Supercar">Supercar</option>
          <option value="Hypercar">Hypercar</option>
          <option value="Prototype">Prototype</option>
        </select>
        <input required type="number" name="topSpeed" value={formData.topSpeed} onChange={handleChange} placeholder="Макс. скорость (км/ч)" style={{ padding: '8px' }} />
        <input required type="number" name="hp" value={formData.hp} onChange={handleChange} placeholder="Мощность (л.с.)" style={{ padding: '8px' }} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Сохранить</button>
          <button type="button" onClick={onClose} style={{ padding: '10px 20px', cursor: 'pointer' }}>Отмена</button>
        </div>
      </form>
    </div>
  );
}