export default function Filter({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  sortBy,
  setSortBy
}) {
  return (
    <div style={{ padding: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap', backgroundColor: '#f9f9f9' }}>
      <input
        type="text"
        placeholder="Поиск по марке или модели"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', minWidth: '200px' }}
      />
      <select 
        value={filterCategory} 
        onChange={(e) => setFilterCategory(e.target.value)} 
        style={{ padding: '8px' }}
      >
        <option value="All">Все категории</option>
        <option value="Classic">Classic</option>
        <option value="Sports Car">Sports Car</option>
        <option value="Supercar">Supercar</option>
        <option value="Hypercar">Hypercar</option>
        <option value="Prototype">Prototype</option>
      </select>
      <select 
        value={sortBy} 
        onChange={(e) => setSortBy(e.target.value)} 
        style={{ padding: '8px' }}
      >
        <option value="default">Сортировка: По умолчанию</option>
        <option value="speedDesc">Скорость (По убыванию)</option>
        <option value="speedAsc">Скорость (По возрастанию)</option>
        <option value="yearDesc">Год (Сначала новые)</option>
        <option value="yearAsc">Год (Сначала старые)</option>
      </select>
    </div>
  );
}