import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const carSchema = z.object({
  brand: z.string().min(2, "Бренд должен содержать минимум 2 символа"),
  model: z.string().min(1, "Укажите модель"),
  year: z.coerce.number().min(1886, "Год от 1886").max(new Date().getFullYear() + 1, "Некорректный год"),
  category: z.string(),
  topSpeed: z.coerce.number().positive("Скорость должна быть больше 0"),
  hp: z.coerce.number().positive("Мощность должна быть больше 0")
});

export default function NewCarForm({ onAdd, onClose }) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(carSchema),
    defaultValues: { category: "Sports Car" }
  });

  const onSubmit = (data) => {
    onAdd({ ...data, image: null, id: Date.now().toString() });
  };

  const inputStyle = {
    padding: '12px 15px', borderRadius: '8px', border: '1px solid #334155',
    background: '#0f172a', color: '#f8fafc', fontSize: '1rem', outline: 'none', width: '100%', boxSizing: 'border-box'
  };
  const errorStyle = { color: "#f87171", fontSize: "0.85rem", margin: "4px 0 0 4px" };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 20px' }}>
      <div style={{ 
        width: '100%', maxWidth: '500px', padding: '30px', 
        background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#f8fafc', textAlign: 'center', fontSize: '1.5rem' }}>
          Добавить новый авто
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <input {...register("brand")} placeholder="Бренд" style={inputStyle} />
            {errors.brand && <p style={errorStyle}>{errors.brand.message}</p>}
          </div>

          <div>
            <input {...register("model")} placeholder="Модель" style={inputStyle} />
            {errors.model && <p style={errorStyle}>{errors.model.message}</p>}
          </div>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <input type="number" {...register("year")} placeholder="Год выпуска" style={inputStyle} />
              {errors.year && <p style={errorStyle}>{errors.year.message}</p>}
            </div>
            <div style={{ flex: 1 }}>
              <select {...register("category")} style={{ ...inputStyle, cursor: 'pointer', height: '48px' }}>
                <option value="Classic" style={{ background: '#0f172a' }}>Classic</option>
                <option value="Sports Car" style={{ background: '#0f172a' }}>Sports Car</option>
                <option value="Supercar" style={{ background: '#0f172a' }}>Supercar</option>
                <option value="Hypercar" style={{ background: '#0f172a' }}>Hypercar</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <input type="number" {...register("topSpeed")} placeholder="Макс. скорость (км/ч)" style={inputStyle} />
              {errors.topSpeed && <p style={errorStyle}>{errors.topSpeed.message}</p>}
            </div>
            <div style={{ flex: 1 }}>
              <input type="number" {...register("hp")} placeholder="Мощность (л.с.)" style={inputStyle} />
              {errors.hp && <p style={errorStyle}>{errors.hp.message}</p>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <button disabled={isSubmitting} type="submit" style={{ flex: 1, padding: '12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
              {isSubmitting ? "Сохранение..." : "Сохранить"}
            </button>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', background: '#334155', color: '#f8fafc', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}