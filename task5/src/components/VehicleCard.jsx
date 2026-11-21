export default function VehicleCard({car, onClick}) {
    return(
        <div 
            onClick={() => onClick(car)}
            style={{
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: blur('12px'),
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0', 
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                color: '#f8fafc'
            }}
        >
            <div style={{ width: '100%', height: '180px', overflow: 'hidden', background: '#0f172a' }}>
                {car.image ? (
                    <img 
                        src={car.image} 
                        alt={`${car.brand} ${car.model}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
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
                        fontSize: '1rem',
                        gap: '5px'
                    }}>
                        <span>KBTU Project</span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Студенческая разработка</span>
                    </div>
                )}
            </div>

            <div style={{ padding: '20px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '10px', fontSize: '1.25rem', fontWeight: '600' }}>
                    {car.brand} {car.model}
                </h3>
                <p style={{ margin: '5px 0', color: '#94a3b8', fontSize: '0.9rem' }}>Год: {car.year}</p>
                <p style={{ margin: '5px 0', color: '#94a3b8', fontSize: '0.9rem' }}>Категория: {car.category}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: '#60a5fa', fontWeight: '600' }}> {car.topSpeed} км/ч</span>
                    <span style={{ color: '#c084fc', fontWeight: '600' }}> {car.hp} л.с.</span>
                </div>
            </div>
        </div>
    );
}