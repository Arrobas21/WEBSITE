/* =========================
   ANIMACIÓN #LIKES — Polaroids + partículas lilas
   Pega esto dentro de tu window.addEventListener("load", () => { ... })
   en script.js, después de los ScrollTriggers de colores.
   ========================= */

(function animarLikes() {

  // ── 1. Posiciones finales del abanico ──────────
  // Cada polaroid tiene: x, y, rotación final en el abanico
  // El orden es: izquierda → centro-izq → centro-der → derecha
  const ABANICO = [
    { x: -155, y: 10,  rot: -18 },   // pol1 🌙 — extremo izquierdo
    { x:  -52, y: -12, rot:  -6 },   // pol2 🎵 — centro izquierda
    { x:   52, y: -12, rot:   6 },   // pol3 🌸 — centro derecha
    { x:  155, y: 10,  rot:  18 },   // pol4 📖 — extremo derecho
  ];

  // ── 2. Generar partículas ──────────────────────
  const PARTICLE_PALETTE = [
    { color: '#E2D6F3', minSize: 3, maxSize: 8  },  // lila principal
    { color: '#AFA9EC', minSize: 2, maxSize: 5  },  // lila media
    { color: '#C8A97E', minSize: 2, maxSize: 4  },  // dorado acento
    { color: '#F2C6D4', minSize: 3, maxSize: 6  },  // rosa suave
    { color: '#CECBF6', minSize: 2, maxSize: 5  },  // lila claro
  ];

  const container = document.getElementById('likesParticles');

  if (container) {
    for (let i = 0; i < 30; i++) {
      const pal  = PARTICLE_PALETTE[i % PARTICLE_PALETTE.length];
      const size = pal.minSize + Math.random() * (pal.maxSize - pal.minSize);

      const p = document.createElement('div');
      p.className = 'likes-particle';
      p.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `background:${pal.color}`,
        `left:${5 + Math.random() * 90}%`,
        `bottom:${Math.random() * 15}%`,
        `animation-duration:${3 + Math.random() * 5}s`,
        `animation-delay:${Math.random() * 5}s`,
        `opacity:0`,
      ].join(';');

      container.appendChild(p);
    }
  }

  // ── 3. Estado inicial: polaroids apilados al centro ──
  // Los apilamos manualmente antes de que GSAP los mueva
  const pols = [
    document.getElementById('likePol1'),
    document.getElementById('likePol2'),
    document.getElementById('likePol3'),
    document.getElementById('likePol4'),
  ];

  // Posición inicial: todos centrados y apilados con leve rotación aleatoria
  const ROTACIONES_INICIALES = [-4, 2, -7, 5];

  pols.forEach((pol, i) => {
    if (!pol) return;
    gsap.set(pol, {
      x: -60,                        // centrado horizontal (la mitad del ancho del pol)
      y: -65,                        // centrado vertical
      rotation: ROTACIONES_INICIALES[i],
      zIndex: i + 1,
      opacity: 0,
    });
  });

  // ── 4. Timeline principal ──────────────────────
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#likes',
      start: 'top 60%',
      once: true,
    },
  });

  // 4a. Patrón SVG aparece
  tl.fromTo('.likes-pattern',
    { opacity: 0 },
    { opacity: 1, duration: 0.9, ease: 'power2.out' }
  );

  // 4b. Glass card entra desde abajo
  tl.fromTo('.likes-content',
    { opacity: 0, y: 45 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    '-=0.4'
  );

  // 4c. Eyebrow
  tl.fromTo('#likesEyebrow',
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    '-=0.3'
  );

  // 4d. Título
  tl.fromTo('#likesTitle',
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
    '-=0.25'
  );

  // 4e. Polaroids aparecen apilados (fade in juntos)
  tl.to(pols, {
    opacity: 1,
    duration: 0.4,
    stagger: 0.06,
    ease: 'power2.out',
  }, '-=0.1');

  // 4f. ABANICO — el momento principal
  // Cada polaroid vuela a su posición final con spring y stagger
  tl.to(pols, {
    x: (i) => ABANICO[i].x,
    y: (i) => ABANICO[i].y,
    rotation: (i) => ABANICO[i].rot,
    duration: 0.85,
    ease: 'back.out(1.4)',        // spring natural al llegar
    stagger: {
      each: 0.08,                 // se van separando uno a uno
      from: 'center',             // empieza desde el centro hacia los extremos
    },
  }, '-=0.05');

  // ── 5. Control de partículas: solo visibles dentro de #likes ──
  ScrollTrigger.create({
    trigger: '#likes',
    start: 'top bottom',
    end: 'bottom top',

    onEnter: () => {
      document.querySelectorAll('.likes-particle').forEach(p => {
        p.style.animationPlayState = 'running';
      });
    },

    onLeave: () => {
      document.querySelectorAll('.likes-particle').forEach(p => {
        p.style.animationPlayState = 'paused';
        p.style.opacity = '0';
      });
    },

    onEnterBack: () => {
      document.querySelectorAll('.likes-particle').forEach(p => {
        p.style.animationPlayState = 'running';
      });
    },

    onLeaveBack: () => {
      document.querySelectorAll('.likes-particle').forEach(p => {
        p.style.animationPlayState = 'paused';
        p.style.opacity = '0';
      });
    },
  });

})();