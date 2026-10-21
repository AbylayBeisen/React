import { useState, useEffect } from 'react';
import { initializeData, fetchCars, addCar } from './api/api';
import Header from './components/Header';
import VehicleGrid from './components/VehicleGrid';
import Filter from './components/Filter';
import Pagination from './components/Pagination';
import NewCarForm from './components/NewCarForm';
import VehicleDetails from './components/VehicleDetails';

export default function App() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [selectedCar, setSelectedCar] = useState(null);
  const [isAddingMode, setIsAddingMode] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        initializeData();
        const data = await fetchCars();
        if (isMounted) {
          setCars(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Ошибка загрузки данных');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory, sortBy]);

  const handleAddCar = async (newCarData) => {
    try {
      const newCar = await addCar(newCarData);
      setCars(prev => [newCar, ...prev]);
      setIsAddingMode(false);
    } catch (err) {
      alert('Ошибка при сохранении');
    }
  };

  if (selectedCar) {
    return (
      <div style={{ fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
        <Header onAddClick={() => setIsAddingMode(true)} />
        <VehicleDetails car={selectedCar} onBack={() => setSelectedCar(null)} />
      </div>
    );
  }

  if (isAddingMode) {
    return (
      <div style={{ fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
        <Header onAddClick={() => {}} />
        <NewCarForm onAdd={handleAddCar} onClose={() => setIsAddingMode(false)} />
      </div>
    );
  }

  let processedCars = [...cars];

  if (searchTerm) {
    const lowerSearch = searchTerm.toLowerCase();
    processedCars = processedCars.filter(car =>
      car.brand.toLowerCase().includes(lowerSearch) ||
      car.model.toLowerCase().includes(lowerSearch)
    );
  }

  if (filterCategory !== 'All') {
    processedCars = processedCars.filter(car => car.category === filterCategory);
  }

  if (sortBy === 'speedDesc') processedCars.sort((a, b) => b.topSpeed - a.topSpeed);
  if (sortBy === 'speedAsc') processedCars.sort((a, b) => a.topSpeed - b.topSpeed);
  if (sortBy === 'yearDesc') processedCars.sort((a, b) => b.year - a.year);
  if (sortBy === 'yearAsc') processedCars.sort((a, b) => a.year - b.year);

  const totalPages = Math.ceil(processedCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCars = processedCars.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
      <Header onAddClick={() => setIsAddingMode(true)} />
      
      {!isLoading && !error && (
        <Filter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      )}

      {isLoading && <p style={{ padding: '20px' }}>Загрузка данных...</p>}
      {error && <p style={{ color: 'red', padding: '20px' }}>{error}</p>}
      
      {!isLoading && !error && processedCars.length === 0 && (
        <p style={{ padding: '20px' }}>Ничего не найдено.</p>
      )}
      
      {!isLoading && !error && processedCars.length > 0 && (
        <>
          <VehicleGrid cars={currentCars} onCarClick={setSelectedCar} />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            setCurrentPage={setCurrentPage} 
          />
        </>
      )}
    </div>
  );
}