import { useState, useEffect } from "react";
import { getItemsList, createItem } from "./api/fakeApi.js";
import ItemDetails from "./components/ItemDetails.jsx";
import ItemForm from "./components/ItemForm.jsx";

export default function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  const [isCreating, setIsCreating] = useState(false);
  const [isSubmittingCreate, setIsSubmittingCreate] = useState(false);

  useEffect(() => {
    let ignore = false;
    
    setIsLoading(true);
    setError(null);

    getItemsList()
      .then((response) => {
        if (!ignore) {
          setItems(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [reloadTrigger]);

  const handleReload = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  const handleCreateItem = async (formData) => {
    setIsSubmittingCreate(true);
    try {
      const newItem = await createItem(formData);
      setItems((prev) => [newItem, ...prev]);
      setIsCreating(false);
    } catch (err) {
      alert("Ошибка создания: " + err.message);
    } finally {
      setIsSubmittingCreate(false);
    }
  };

  const handleItemUpdated = (updatedItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleItemDeleted = (deletedId) => {
    setItems((prev) => prev.filter((item) => item.id !== deletedId));
  };

  if (selectedId) {
    return (
      <div className="container">
        <ItemDetails 
          selectedId={selectedId} 
          onBack={() => setSelectedId(null)} 
          onItemUpdated={handleItemUpdated}
          onItemDeleted={handleItemDeleted}
        />
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h2>Auto Archive</h2>
        <div className="header-actions">
          <button onClick={handleReload} disabled={isLoading} className="btn btn-secondary">
            {isLoading ? "Загрузка..." : "Обновить"}
          </button>
          <button onClick={() => setIsCreating(true)} className="btn btn-success">
            + Добавить авто
          </button>
        </div>
      </header>

      {isCreating && (
        <ItemForm 
          onSubmit={handleCreateItem} 
          onCancel={() => setIsCreating(false)} 
          isLoading={isSubmittingCreate} 
        />
      )}

      {error && <div className="banner-error">Ошибка: {error}</div>}

      {!isLoading && !error && items.length === 0 && (
        <div className="loader" style={{ color: "#94a3b8" }}>Список пуст.</div>
      )}

      {isLoading ? (
        <div className="loader">Загрузка данных ...</div>
      ) : (
        <div className="grid">
          {items.map((item) => (
            <div key={item.id} className="card" onClick={() => setSelectedId(item.id)}>
              <div className="card-header">
                <h3 className="card-title">{item.name}</h3>
                <span className={`badge ${item.status === "In Maintenance" ? "badge-maintenance" : "badge-available"}`}>
                  {item.status || "Available"}
                </span>
              </div>
              <p className="card-desc">{item.description}</p>
              <div style={{ fontSize: "0.85rem", color: "#60a5fa", fontWeight: 600 }}>
                Детали
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}