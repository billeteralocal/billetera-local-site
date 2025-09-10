// ---------- UI base ----------
document.addEventListener("DOMContentLoaded", () => {
  // Menú móvil (si existe el botón)
  const navToggle = document.querySelector(".nav-toggle");
  const topNav = document.getElementById("topNav");
  if (navToggle && topNav) {
    navToggle.addEventListener("click", () => {
      topNav.classList.toggle("open");
    });
  }

  // Año en el footer (si existe)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Calculadora ----------
  const form = document.getElementById("calc-form");
  if (!form) return; // si no existe el form, no hacemos nada

  const montoEl   = document.getElementById("monto");
  const interesEl = document.getElementById("interes");
  const mesesEl   = document.getElementById("meses");

  // Cuadro de resultado: acepta #resultado o #calc-result (para ser compatibles)
  const out =
    document.getElementById("resultado") ||
    document.getElementById("calc-result");

  const money = (n) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita el salto a la parte superior

    const P = parseFloat(montoEl?.value || "0");
    const r = parseFloat(interesEl?.value || "0");
    const m = parseInt(mesesEl?.value || "0", 10);

    if (!out) return;

    if (isNaN(P) || isNaN(r) || isNaN(m) || P <= 0 || r <= 0 || m <= 0) {
      out.innerHTML = `<strong>Verifica los valores ingresados.</strong>`;
      return;
    }

    // Interés simple mensual (estimación)
    const interesTotal = P * (r / 100) * m;
    const total        = P + interesTotal;
    const cuota        = total / m;

    out.innerHTML = `
      <div><strong>Total estimado:</strong> ${money(total)}</div>
      <div><strong>Interés total:</strong> ${money(interesTotal)}</div>
      <div><strong>Cuota mensual aprox.:</strong> ${money(cuota)}</div>
      <small>Estimación informativa. La oferta final puede variar según el bien y el plazo.</small>
    `;

    // (Opcional) desplazar suave al resultado si estás en móvil
    out.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});
