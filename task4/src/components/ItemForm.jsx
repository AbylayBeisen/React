import { useState } from "react";

export default function ItemForm({ initialData, onSubmit, onCancel, isLoading }) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "Sports");
  const [year, setYear] = useState(initialData?.year || 2024);
  const [status, setStatus] = useState(initialData?.status || "Available");
  const [price, setPrice] = useState(initialData?.price || 100000);
  const [speed, setSpeed] = useState(initialData?.speed || 250);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      category,
      year: Number(year),
      status,
      price: Number(price),
      speed: Number(speed),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="panel">
      <h3 style={{ marginTop: 0 }}>{initialData ? "Редактировать авто" : "Добавить новое авто"}</h3>
      
      <div className="form-group">
        <label>Название авто</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Описание</label>
        <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Категория</label>
          <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Год выпуска</label>
          <input type="number" className="form-control" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Статус</label>
          <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Available">Available</option>
            <option value="In Maintenance">In Maintenance</option>
          </select>
        </div>
        <div className="form-group">
          <label>Цена ($)</label>
          <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Скорость (км/ч)</label>
          <input type="number" className="form-control" value={speed} onChange={(e) => setSpeed(e.target.value)} />
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button type="submit" disabled={isLoading} className="btn btn-primary">
          {isLoading ? "Сохранение..." : "Сохранить"}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Отмена
        </button>
      </div>
    </form>
  );
}