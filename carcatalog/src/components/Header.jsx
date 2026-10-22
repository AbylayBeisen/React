export default function Header({ onAddClick }) {
  return (
    <header style={{ 
      padding: '20px 40px', 
      background: 'rgba(30, 41, 59, 0.8)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <h2 style={{ 
        margin: 0, 
        fontSize: '1.8rem', 
        color: '#f8fafc',
        fontWeight: '700'
      }}>
        Auto & Prototype Archive
      </h2>
      <button 
        onClick={onAddClick} 
        style={{ 
          padding: '10px 20px', 
          background: '#3b82f6', 
          color: '#fff', 
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => e.target.style.background = '#2563eb'}
        onMouseOut={(e) => e.target.style.background = '#3b82f6'}
      >
        Добавить авто
      </button>
    </header>
  );
}