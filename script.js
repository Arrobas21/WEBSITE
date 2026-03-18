window.addEventListener("load", () => {

  // Barra de progreso de scroll
  const progressBar = document.getElementById("progress-bar");
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  });

  const loader = document.querySelector(".page-loader");

  // tiempo total en pantalla (oscuro + texto visible)
  setTimeout(() => {

    // empieza a desvanecerse
    loader.classList.add("hide");

    // eliminar después del fade
    setTimeout(() => {
      loader.remove();
    }, 1500);

  }, 3200); // ← duración en negro (ajústalo aquí)

  // Seleccionar todos los cuadros
  const cajas = document.querySelectorAll(".section-content");

  // Observer para detectar cuando bajas a cada sección
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // para que solo se anime una vez
      }
    });
  }, {
    threshold: 0.3
  });

  // Observar cada cuadro
  cajas.forEach((caja) => {
    observer.observe(caja);
  });
});