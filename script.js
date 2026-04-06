// Espera a que toda la página termine de cargar antes de ejecutar el script
window.addEventListener("load", () => {

  // Busca la barra superior que mostrará el progreso del scroll
  const progressBar = document.getElementById("progress-bar"); 
  
  // Escucha el evento de scroll en toda la ventana
  window.addEventListener("scroll", () => {
    // Guarda la distancia recorrida desde la parte superior de la página
    const scrollTop = window.scrollY;

    // Calcula la altura total que se puede recorrer haciendo scroll
    const docHeight = document.body.scrollHeight - window.innerHeight;

    // Convierte el avance actual en un porcentaje
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    // Actualiza el ancho de la barra con ese porcentaje
    progressBar.style.width = pct + "%";
  });

  // Selecciona el loader o pantalla de carga inicial
  const loader = document.querySelector(".page-loader");

  // Espera el tiempo definido antes de comenzar a ocultar el loader
  setTimeout(() => {

    // Agrega la clase que inicia el desvanecimiento
    loader.classList.add("hide");

    // Espera a que termine la transición y luego elimina el loader del DOM
    setTimeout(() => {
      loader.remove();
    }, 1500);

  }, 3200); // Tiempo que permanece visible el loader antes de desaparecer

  // Selecciona todos los cuadros que se animarán al entrar en pantalla
  const cajas = document.querySelectorAll(".section-content");

  // Crea un observador para detectar cuándo un cuadro entra en la vista
  const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("show");
      void entry.target.offsetWidth;
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, {
  threshold: 0.3
});

  // Empieza a observar cada cuadro seleccionado
  cajas.forEach((caja) => {
    observer.observe(caja);
  });
});
