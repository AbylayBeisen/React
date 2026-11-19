export default function About() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", color: "#f8fafc", padding: "40px 20px" }}>
      <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>О проекте</h2>
      <div style={{ background: "rgba(30, 41, 59, 0.7)", padding: "30px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", lineHeight: "1.8" }}>
        <p style={{ fontSize: "1.1rem" }}>
          Данное веб-приложение разработано в рамках учебного проекта KBTU.
        </p>
        <ul style={{ marginTop: "20px", color: "#94a3b8" }}>
          <li>Стек технологий: React, React Router, Vite.</li>
          <li>Архитектура: Single Page Application (SPA).</li>
          <li>Хранение данных: LocalStorage (имитация REST API).</li>
          <li>Фичи: Ленивая загрузка (Suspense), фильтрация, пагинация, корзина/гараж.</li>
        </ul>
      </div>
    </div>
  );
}