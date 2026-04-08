window.addEventListener("load", () => {

  // ── Colores ──
  const secs = [
    { id: 'intro',    color: '#FFFDE5' },
    { id: 'birthday', color: '#F9EEF3' },
    { id: 'animals',  color: '#EEF5F9' },
    { id: 'likes',    color: '#F3F0FA' },
    { id: 'message',  color: '#FFF8EE' },
    { id: 'final',    color: '#FFFDE5' },
  ];

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function hexToRgb(hex) {
    return [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    ];
  }

  function interpolateColor(c1, c2, t) {
    const [r1, g1, b1] = hexToRgb(c1);
    const [r2, g2, b2] = hexToRgb(c2);

    return `rgb(${Math.round(lerp(r1, r2, t))},${Math.round(lerp(g1, g2, t))},${Math.round(lerp(b1, b2, t))})`;
  }

  function updateColors() {
    const scrollTop = window.scrollY;
    const viewH = window.innerHeight;

    secs.forEach((s, i) => {
      const el = document.getElementById(s.id);
      if (!el) return;

      const prev = i > 0 ? secs[i - 1].color : s.color;
      const t = Math.min(1, Math.max(0, (scrollTop - el.offsetTop + viewH) / viewH));

      el.style.background = interpolateColor(prev, s.color, t);
    });
  }

  window.addEventListener("scroll", updateColors, { passive: true });
  updateColors();

  // ── Barra de progreso ──
  const progressBar = document.getElementById("progress-bar");

  window.addEventListener("scroll", () => {
    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressBar.style.width = pct + "%";
  });

  // ── GSAP ──
  gsap.registerPlugin(ScrollTrigger);

  // ── Loader ──
  const loader = document.querySelector(".page-loader");

  if (loader) {
    gsap.to(loader, {
      opacity: 0,
      duration: 1,
      delay: 3.2,
      onComplete: () => loader.remove()
    });
  }

  // ── Section content ──
  const cajas = document.querySelectorAll(".section-content");

  cajas.forEach((caja) => {
    gsap.fromTo(
      caja,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: caja,
          start: "top 70%",
          toggleActions: "restart reverse restart reverse"
        }
      }
    );
  });

});