export default function Filter({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  sortBy,
  setSortBy
}) {
  const inputStyle = {
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #334155',
    background: '#0f172a',
    color: '#f8fafc',
    fontSize: '1rem',
    outline: 'none',
    minWidth: '220px',
    fontFamily: 'inherit'
  };

  const optionStyle = { background: '#0f172a', color: '#f8fafc' };

  return (
    <div style={{ 
      padding: '20px', 
      display: 'flex', 
      gap: '15px', 
      flexWrap: 'wrap', 
      background: '#1e293b', 
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      marginBottom: '30px'
    }}>
      <input
        type="text"
        placeholder="Поиск по марке или модели"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={inputStyle}
      />
      <select 
        value={filterCategory} 
        onChange={(e) => setFilterCategory(e.target.value)} 
        style={{ ...inputStyle, cursor: 'pointer' }}
      >
        <option value="All" style={optionStyle}>Все категории</option>
        <option value="Classic" style={optionStyle}>Classic</option>
        <option value="Sports Car" style={optionStyle}>Sports Car</option>
        <option value="Supercar" style={optionStyle}>Supercar</option>
        <option value="Hypercar" style={optionStyle}>Hypercar</option>
        <option value="Prototype" style={optionStyle}>Prototype</option>
      </select>
      <select 
        value={sortBy} 
        onChange={(e) => setSortBy(e.target.value)} 
        style={{ ...inputStyle, cursor: 'pointer' }}
      >
        <option value="default" style={optionStyle}>Сортировка: По умолчанию</option>
        <option value="speedDesc" style={optionStyle}>Скорость (По убыванию)</option>
        <option value="speedAsc" style={optionStyle}>Скорость (По возрастанию)</option>
        <option value="yearDesc" style={optionStyle}>Год (Сначала новые)</option>
        <option value="yearAsc" style={optionStyle}>Год (Сначала старые)</option>
      </select>
    </div>
  );
}