window.addEventListener("load", () => {

  if ("scrollRestoration" in history) // Evitar que el navegador intente restaurar la posición de scroll al recargar 
  {
    history.scrollRestoration = "manual";
  }

  document.body.classList.add("no-scroll");
  
  window.scrollTo(0, 0);
  // ── Colores ──
  const secs = [
    { id: 'intro',    color: '#FFFDE5' },
    { id: 'birthday', color: '#F9EEF3' },
    { id: 'animals',  color: '#EEF5F9' },
    { id: 'likes',    color: '#F3F0FA' },
    { id: 'message',  color: '#FFF8EE' },
    { id: 'final',    color: '#FFFDE5' },
  ];

  // ── Barra de progreso ──
  const progressBar = document.getElementById("progress-bar");

  // Ajusta el ancho de la barra para reflejar el porcentaje recorrido de la página.
  window.addEventListener("scroll", () => {
    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressBar.style.width = pct + "%";
  });

  // ── GSAP ──
  gsap.registerPlugin(ScrollTrigger);

  // Crea triggers para cada sección que cambian el fondo del body al entrar.
  secs.forEach((s) => {
    const el = document.getElementById(s.id);
    
    if (!el) return;
    const applyBG = () => 
      gsap.to(document.body,{
        backgroundColor: s.color,
        duration: 0.9,
        ease: "power2.inOut",
        overwrite: "auto"
      });

      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        onEnter: applyBG,
        onEnterBack: applyBG,
      });
  });

  gsap.set(document.body, { backgroundColor: secs[0].color }); // Establece el color inicial al cargar la página.
  
  // ── Section content ──
  const cajas = document.querySelectorAll(".section-content");

  cajas.forEach((caja) => {
    // Anima la entrada de cada bloque cuando aparece en el viewport.
    gsap.fromTo(
      caja,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: caja,
          start: "top 70%",
          toggleActions: "restart reverse restart reverse"
        }
      }
    );
  });
    // ── Loader ──
  const loader = document.querySelector(".page-loader");

  if (loader) {
    // Desvanece el loader inicial, reactiva el scroll y recalcula los triggers.
    gsap.to(loader, {
      opacity: 0,
      duration: 1,
      delay: 3.2,
      onComplete: () =>{ 
      loader.remove()
      document.body.classList.remove("no-scroll");
      
      ScrollTrigger.refresh();
      }
    });
  }

 /* =========================
   ANIMACIÓN #FINAL — GSAP  (versión corregida)
   Pega esto dentro de tu window.addEventListener("load", () => { ... })
   en script.js, después de los ScrollTriggers de colores.
   ========================= */
 
// ── Paleta de confetti (tu paleta exacta) ──
const CONFETTI_COLORS = [
  '#F2C6D4',
  '#CFE8EE',
  '#E2D6F3',
  '#C8A97E',
  '#F9EEF3',
];
 
// ── 1. Crear partículas en el DOM ──
(function crearConfetti() {
  const container = document.getElementById('finalConfetti');
  if (!container) return;
 
  for (let i = 0; i < 55; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
 
    const size  = 4 + Math.random() * 7;
    const left  = 5 + Math.random() * 90;
    const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    const shape = i % 3; // 0=círculo, 1=cuadrado, 2=rombo
 
    piece.style.cssText = `
      width:${size}px;
      height:${size}px;
      background:${color};
      left:${left}%;
      top:-20px;
      opacity:0;
      border-radius:${shape === 0 ? '50%' : shape === 1 ? '2px' : '0'};
    `;
 
    container.appendChild(piece);
  }
})();
 
// ── 2. Timeline de animación ──
(function animarFinal() {
 
  // FIX: usamos fromTo en cada elemento → sin conflictos to/from simultáneos
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#final',
      start: 'top 60%',
      once: true,             // FIX: evita el problema del reverse que congela opacity
    },
    // FIX: al terminar, limpia los estilos inline de GSAP para no dejar residuos
    onComplete: () => {
      gsap.set(
        ['#finalTopline','#finalEyebrow','#finalTitle',
         '#finalDivider','#finalSub','#finalSig','#finalFooter'],
        { clearProps: 'all' }
      );
    }
  });
 
  // 1. Línea que se expande
  tl.fromTo('#finalTopline',
    { width: 0 },
    { width: '60px', duration: 0.7, ease: 'power3.out' }
  );
 
  // 2. Eyebrow
  tl.fromTo('#finalEyebrow',
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    '-=0.3'
  );
 
  // 3. Título
  tl.fromTo('#finalTitle',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
    '-=0.2'
  );
 
  // 4. Divisor con corazón
  tl.fromTo('#finalDivider',
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.8)' },
    '-=0.3'
  );
 
  // 5. Subtítulo
  tl.fromTo('#finalSub',
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    '-=0.1'
  );
 
  // 6. Firma
  tl.fromTo('#finalSig',
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    '-=0.1'
  );
 
  // 7. Pie editorial
  tl.fromTo('#finalFooter',
    { opacity: 0 },
    { opacity: 1, duration: 0.5, ease: 'power2.out' },
    '-=0.2'
  );
 
  // 8. Confetti
  const pieces = document.querySelectorAll('.confetti-piece');
 
  tl.to(pieces, {
    opacity: 1,
    y: () => 280 + Math.random() * 200,
    x: () => (Math.random() - 0.5) * 120,
    rotation: () => Math.random() * 720,
    duration: () => 1.8 + Math.random() * 1.4,
    ease: 'power1.out',
    stagger: { each: 0.04, from: 'random' },
    onComplete: () => {
      gsap.to(pieces, {
        opacity: 0,
        duration: 0.8,
        stagger: { each: 0.02, from: 'random' },
        onComplete: () => {
          gsap.set(pieces, { y: 0, x: 0, rotation: 0, opacity: 0 });
        }
      });
    }
  }, '-=0.4');
 
})();

/* =========================
   ANIMACIÓN #BIRTHDAY — GSAP
   Pega esto dentro de tu window.addEventListener("load", () => { ... })
   en script.js, después de los ScrollTriggers de colores.
   ========================= */
 
(function animarBirthday() {
 
  // ── Configuración ──────────────────────────────
  const EDAD        = 25;    // ← cambia este número a la edad real
  const DURACION_CONTADOR = 2.0; // segundos que tarda en contar
 
  // ── Contador animado ───────────────────────────
  // Usamos un objeto proxy { val: 0 } porque GSAP no puede
  // animar el textContent directamente — sí puede animar
  // propiedades de objetos JS y nosotros actualizamos el DOM
  // en onUpdate.
  const counter = { val: 0 };
 
  function animarContador() {
    gsap.to(counter, {
      val: EDAD,
      duration: DURACION_CONTADOR,
      ease: 'power2.out',       // acelera al principio, desacelera al llegar
      roundProps: 'val',        // redondea a entero en cada frame
      onUpdate: () => {
        const el = document.getElementById('bdayNum');
        if (el) el.textContent = counter.val;
      },
    });
  }
 
  // ── Timeline principal ─────────────────────────
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#birthday',
      start: 'top 60%',
      once: true,               // se dispara una sola vez, sin conflictos de reverse
      onEnter: animarContador,  // el contador arranca justo cuando entra la sección
    },
  });
 
  // 1. Panel izquierdo: entra desde la izquierda
  tl.fromTo('#bdayLeft',
    { x: -60, opacity: 0 },
    { x: 0,   opacity: 1, duration: 0.8, ease: 'power3.out' }
  );
 
  // 2. Panel derecho: entra desde la derecha, al mismo tiempo
  tl.fromTo('#bdayRight',
    { x: 60, opacity: 0 },
    { x: 0,  opacity: 1, duration: 0.8, ease: 'power3.out' },
    '<'                         // '<' = al mismo tiempo que el paso anterior
  );
 
  // 3. Línea vertical entre paneles (crece de arriba hacia abajo)
  tl.fromTo('.bday-left-line',
    { height: '0%' },
    { height: '80%', duration: 0.7, ease: 'power2.inOut' },
    '-=0.3'
  );
 
  // 4. Eyebrow del panel derecho
  tl.fromTo('#bdayEyebrow',
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    '-=0.4'
  );
 
  // 5. Título
  tl.fromTo('#bdayTitle',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
    '-=0.3'
  );
 
  // 6. Texto del cuerpo
  tl.fromTo('#bdayBody',
    { opacity: 0, y: 14 },
    { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
    '-=0.2'
  );
 
  // 7. Tag con línea que se expande
  tl.fromTo('#bdayTag',
    { opacity: 0 },
    { opacity: 1, duration: 0.4, ease: 'power2.out' },
    '-=0.1'
  );
 
  tl.fromTo('.bday-tag-line',
    { width: 0 },
    { width: '28px', duration: 0.5, ease: 'power3.out' },
    '<'
  );
 
  // 8. Número: aparece con un rebote suave (el counter ya está corriendo)
  tl.fromTo('#bdayNum',
    { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.6)' },
    0.1                         // 0.1s desde el inicio del timeline (muy temprano)
  );
 
})();


});
