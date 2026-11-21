import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getItemsList } from "../services/fakeApi.js"; 
import Filter from "../components/Filter.jsx";
import VehicleGrid from "../components/VehicleGrid.jsx";
import Pagination from "../components/Pagination.jsx";

export default function CarList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchTerm = searchParams.get("search") || "";
  const filterCategory = searchParams.get("category") || "All";
  const sortBy = searchParams.get("sort") || "default";
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cars", searchParams.toString()],
    queryFn: () => getItemsList(searchParams.toString()),
  });

  const cars = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== "All" && value !== "default") newParams.set(key, value);
    else newParams.delete(key);
    if (key !== "page") newParams.set("page", 1);
    setSearchParams(newParams);
  };

  return (
    <div>
      <Filter 
        searchTerm={searchTerm} setSearchTerm={(val) => updateParam("search", val)}
        filterCategory={filterCategory} setFilterCategory={(val) => updateParam("category", val)}
        sortBy={sortBy} setSortBy={(val) => updateParam("sort", val)}
      />
      {isLoading && <p style={{ color: "#f8fafc", padding: "20px", textAlign: "center" }}>Загрузка...</p>}
      {isError && <p style={{ color: "#ef4444", padding: "20px", textAlign: "center" }}>Ошибка сети</p>}
      {!isLoading && !isError && cars.length === 0 && <p style={{ color: "#f8fafc", padding: "20px", textAlign: "center" }}>Ничего не найдено</p>}
      {!isLoading && !isError && <VehicleGrid cars={cars} onCarClick={(car) => navigate(`/items/${car.id}`)} />}
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={(val) => updateParam("page", val)} isLoading={isLoading} />
    </div>
  );
}