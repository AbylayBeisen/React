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
      hp: Number(formData.hp),
      image: null 
    });
  };


  const inputStyle = {
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #334155',
    background: '#0f172a',
    color: '#f8fafc',
    fontSize: '1rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  };

  const optionStyle = { background: '#0f172a', color: '#f8fafc' };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ 
        width: '100%',
        maxWidth: '500px',
        padding: '30px', 
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)', 
        borderRadius: '16px',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)'
      }}>
        <h2 style={{ 
          marginTop: 0, 
          marginBottom: '25px', 
          color: '#f8fafc', 
          textAlign: 'center',
          fontSize: '1.8rem' 
        }}>
          Добавить новый авто
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input required name="brand" value={formData.brand} onChange={handleChange} placeholder="Бренд" style={inputStyle} />
          <input required name="model" value={formData.model} onChange={handleChange} placeholder="Модель" style={inputStyle} />
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <input required type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Год выпуска" style={{ ...inputStyle, flex: 1 }} />
            <select name="category" value={formData.category} onChange={handleChange} style={{ ...inputStyle, flex: 1, cursor: 'pointer' }}>
              <option value="Classic" style={optionStyle}>Classic</option>
              <option value="Sports Car" style={optionStyle}>Sports Car</option>
              <option value="Supercar" style={optionStyle}>Supercar</option>
              <option value="Hypercar" style={optionStyle}>Hypercar</option>
              <option value="Prototype" style={optionStyle}>Prototype</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <input required type="number" name="topSpeed" value={formData.topSpeed} onChange={handleChange} placeholder="Макс. скорость (км/ч)" style={{ ...inputStyle, flex: 1 }} />
            <input required type="number" name="hp" value={formData.hp} onChange={handleChange} placeholder="Мощность (л.с.)" style={{ ...inputStyle, flex: 1 }} />
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <button 
              type="submit" 
              style={{ 
                flex: 1,
                padding: '12px 20px', 
                background: '#3b82f6', 
                color: '#fff', 
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.05rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#2563eb'}
              onMouseOut={(e) => e.target.style.background = '#3b82f6'}
            >
              Сохранить
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              style={{ 
                flex: 1,
                padding: '12px 20px', 
                background: '#334155', 
                color: '#f8fafc', 
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.05rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#475569'}
              onMouseOut={(e) => e.target.style.background = '#334155'}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}