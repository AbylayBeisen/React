import { useState, useEffect } from "react";
import { getItem, updateItem, deleteItem } from "../api/fakeApi.js";
import ItemForm from "./ItemForm.jsx";

export default function ItemDetails({ selectedId, onBack, onItemUpdated, onItemDeleted }) {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  useEffect(() => {
    if (!selectedId) return;

    let ignore = false;
    setIsLoading(true);
    setError(null);

    getItem(selectedId)
      .then((data) => {
        if (!ignore) {
          setItem(data);
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
  }, [selectedId]);

  const handleToggleStatus = async () => {
    if (!item || isUpdatingStatus) return;

    const targetId = item.id;
    const nextStatus = item.status === "In Maintenance" ? "Available" : "In Maintenance";

    setIsUpdatingStatus(true);
    try {
      const updated = await updateItem(targetId, { status: nextStatus });
      setItem(updated);
      onItemUpdated(updated);
    } catch (err) {
      alert("Ошибка обновления статуса: " + err.message);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!item || isDeleting) return;
    if (!window.confirm("Удалить этот элемент?")) return;

    const targetId = item.id;
    setIsDeleting(true);
    try {
      await deleteItem(targetId);
      onItemDeleted(targetId);
      onBack();
    } catch (err) {
      alert("Ошибка удаления: " + err.message);
      setIsDeleting(false);
    }
  };

  const handleSaveEdit = async (formData) => {
    if (!item || isSavingEdit) return;

    const targetId = item.id;
    setIsSavingEdit(true);
    try {
      const updated = await updateItem(targetId, formData);
      setItem(updated);
      onItemUpdated(updated);
      setIsEditing(false);
    } catch (err) {
      alert("Ошибка сохранения: " + err.message);
    } finally {
      setIsSavingEdit(false);
    }
  };

  if (isLoading) return <div className="loader">Загрузка деталей #{selectedId}...</div>;

  if (error) {
    return (
      <div className="panel">
        <div className="banner-error">Ошибка: {error}</div>
        <button onClick={onBack} className="btn btn-secondary"> Назад к списку</button>
      </div>
    );
  }

  if (!item) return null;

  if (isEditing) {
    return (
      <ItemForm 
        initialData={item} 
        onSubmit={handleSaveEdit} 
        onCancel={() => setIsEditing(false)} 
        isLoading={isSavingEdit} 
      />
    );
  }

  return (
    <div className="panel">
      <button onClick={onBack} className="btn btn-secondary" style={{ marginBottom: "20px" }}>
        Назад к списку
      </button>

      <h2>{item.name}</h2>

      <div className="details-grid">
        <div className="detail-item">
          <strong>ID</strong>
          <span>{item.id}</span>
        </div>
        <div className="detail-item">
          <strong>Статус</strong>
          <span className={`badge ${item.status === "In Maintenance" ? "badge-maintenance" : "badge-available"}`}>
            {item.status || "Available"}
          </span>
        </div>
        <div className="detail-item">
          <strong>Категория</strong>
          <span>{item.category || "Sports"}</span>
        </div>
        <div className="detail-item">
          <strong>Год выпуска</strong>
          <span>{item.year || 2024}</span>
        </div>
        <div className="detail-item">
          <strong>Стоимость</strong>
          <span>${item.price || 100000}</span>
        </div>
        <div className="detail-item">
          <strong>Макс. скорость</strong>
          <span>{item.speed || 250} км/ч</span>
        </div>
      </div>

      <div style={{ marginBottom: "25px" }}>
        <strong style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Описание</strong>
        <p style={{ margin: "8px 0 0 0", lineHeight: 1.5 }}>{item.description}</p>
      </div>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button onClick={handleToggleStatus} disabled={isUpdatingStatus || isDeleting} className="btn btn-primary">
          {isUpdatingStatus ? "Обновление..." : "Сменить статус"}
        </button>
        <button onClick={() => setIsEditing(true)} disabled={isUpdatingStatus || isDeleting} className="btn btn-warning">
          Редактировать
        </button>
        <button onClick={handleDelete} disabled={isUpdatingStatus || isDeleting} className="btn btn-danger">
          {isDeleting ? "Удаление..." : "Удалить"}
        </button>
      </div>
    </div>
  );
}