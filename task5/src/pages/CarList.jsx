import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getItemsList } from "../services/fakeApi.js";
import Filter from "../components/Filter.jsx";
import VehicleGrid from "../components/VehicleGrid.jsx";
import Pagination from "../components/Pagination.jsx";

export default function CarList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const searchTerm = searchParams.get("search") || "";
  const filterCategory = searchParams.get("category") || "All";
  const sortBy = searchParams.get("sort") || "default";
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

    getItemsList(searchParams.toString())
      .then((res) => {
        if (!ignore) {
          setCars(res.data);
          setTotalPages(res.totalPages || 1);
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));

    return () => {
      ignore = true;
    };
  }, [searchParams]);

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== "All" && value !== "default") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== "page") newParams.set("page", 1);
    setSearchParams(newParams);
  };

  return (
    <div>
      <Filter 
        searchTerm={searchTerm}
        setSearchTerm={(val) => updateParam("search", val)}
        filterCategory={filterCategory}
        setFilterCategory={(val) => updateParam("category", val)}
        sortBy={sortBy}
        setSortBy={(val) => updateParam("sort", val)}
      />
      
      {isLoading && <p style={{ color: "#f8fafc", padding: "20px" }}>Загрузка...</p>}
      {!isLoading && cars.length === 0 && <p style={{ color: "#f8fafc", padding: "20px" }}>Ничего не найдено</p>}
      
      <VehicleGrid 
        cars={cars} 
        onCarClick={(car) => navigate(`/items/${car.id}`)} 
      />
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={(val) => updateParam("page", val)}
        isLoading={isLoading}
      />
    </div>
  );
}