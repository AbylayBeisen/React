export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) return null;

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => prev - 1)}
        style={{ padding: '8px 16px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
      >
        Назад
      </button>
      <span style={{ padding: '8px' }}>
        Страница {currentPage} из {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(prev => prev + 1)}
        style={{ padding: '8px 16px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
      >
        Вперед
      </button>
    </div>
  );
}