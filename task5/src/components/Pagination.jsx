export default function Pagination({ currentPage, totalPages, setCurrentPage, isLoading }) {
  if (totalPages <= 1) return null;

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '10px', justifyContent: 'center', color: '#f8fafc' }}>
      <button
        disabled={isLoading || currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        style={{ 
          padding: '8px 16px', 
          cursor: (isLoading || currentPage === 1) ? 'not-allowed' : 'pointer',
          background: (isLoading || currentPage === 1) ? '#334155' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          opacity: isLoading ? 0.7 : 1
        }}
      >
        Назад
      </button>
      <span style={{ padding: '8px' }}>
        Страница {currentPage} из {totalPages}
      </span>
      <button
        disabled={isLoading || currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        style={{ 
          padding: '8px 16px', 
          cursor: (isLoading || currentPage === totalPages) ? 'not-allowed' : 'pointer',
          background: (isLoading || currentPage === totalPages) ? '#334155' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          opacity: isLoading ? 0.7 : 1
        }}
      >
        Вперед
      </button>
    </div>
  );
}