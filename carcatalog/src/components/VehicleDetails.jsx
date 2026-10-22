export default function VehicleDetails({ car, onBack }) {
  if (!car) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
      
      <div style={{ width: '100%', maxWidth: '800px', marginBottom: '20px' }}>
        <button 
          onClick={onBack} 
          style={{ 
            padding: '10px 20px', 
            background: 'rgba(51, 65, 85, 0.6)', 
            color: '#f8fafc', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(71, 85, 105, 0.8)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(51, 65, 85, 0.6)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          ← Назад к списку
        </button>
      </div>
      <div style={{ 
        width: '100%', 
        maxWidth: '800px', 
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)', 
        borderRadius: '16px', 
        overflow: 'hidden',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)'
      }}>
        
        <div style={{ width: '100%', height: '350px', background: '#0f172a' }}>
          {car.image ? (
            <img 
              src={car.image} 
              alt={`${car.brand} ${car.model}`} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          ) : (
            <div style={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                color: '#60a5fa',
                fontWeight: '600',
                fontSize: '1.5rem',
                gap: '10px'
            }}>
                <span style={{ fontSize: '3rem' }}></span>
                <span>KBTU Project</span>
                <span style={{ fontSize: '1rem', color: '#94a3b8' }}>Студенческая разработка</span>
            </div>
          )}
        </div>

       
        <div style={{ padding: '30px' }}>
          <h2 style={{ marginTop: 0, marginBottom: '25px', fontSize: '2.2rem', color: '#f8fafc', fontWeight: '700' }}>
            {car.brand} {car.model}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontSize: '0.9rem' }}>Год выпуска</p>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>{car.year}</p>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontSize: '0.9rem' }}>Категория</p>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>{car.category}</p>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontSize: '0.9rem' }}>Макс. скорость</p>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600', color: '#60a5fa' }}>⚡ {car.topSpeed} км/ч</p>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontSize: '0.9rem' }}>Мощность</p>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600', color: '#c084fc' }}>🐎 {car.hp} л.с.</p>
            </div>
          </div>
          
          <div style={{ marginTop: '25px', textAlign: 'right', color: '#475569', fontSize: '0.85rem' }}>
            ID в базе: {car.id}
          </div>
        </div>
      </div>
    </div>
  );
}