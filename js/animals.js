function initAnimalsAnimation() {
  const PARTICLE_PALETTE = [
    { color: "#CFE8EE", minSize: 3, maxSize: 7 },
    { color: "#E2D6F3", minSize: 3, maxSize: 8 },
    { color: "#F2C6D4", minSize: 2, maxSize: 5 },
    { color: "#C8A97E", minSize: 2, maxSize: 4 },
  ]; // paleta de colores suave y armoniosa, con tonos pastel que combinan bien con el tema de animales y naturaleza.

  const particlesContainer = document.getElementById("animalsParticles"); // contenedor específico para las partículas de la sección de animales

  if (particlesContainer) // verificamos que el contenedor exista antes de intentar agregar partículas, para evitar errores si el elemento no se encuentra en el DOM.
  {
    for (let i = 0; i < 28; i++) // generamos 28 partículas para un efecto visual agradable sin sobrecargar la sección, manteniendo un equilibrio entre dinamismo y claridad.
    {
      const pal = PARTICLE_PALETTE[i % PARTICLE_PALETTE.length]; 
      const size = pal.minSize + Math.random() * (pal.maxSize - pal.minSize);
      const left = 5 + Math.random() * 90;
      const dur = 3 + Math.random() * 5;
      const delay = Math.random() * 5;

      const p = document.createElement("div");
      p.className = "animals-particle";
      p.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `background:${pal.color}`,
        `left:${left}%`,
        `bottom:${Math.random() * 15}%`,
        `animation-duration:${dur}s`,
        `animation-delay:${delay}s`,
        `opacity:0`,
      ].join(";");

      particlesContainer.appendChild(p); // agregamos cada partícula al contenedor específico de la sección de animales, asegurando que solo aparezcan en esa sección y no afecten otras partes del sitio.
    }
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#animals",
      start: "top 60%",
      once: true,
    },
  }); // timeline principal de animación para la sección de animales, que se activa cuando la sección entra en el viewport, creando una experiencia visual atractiva y coherente con el tema de la sección.

  tl.fromTo(
    ".animals-pattern",
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: "power2.out" }
  );

  tl.fromTo(
    "#animalsOrb1",
    { opacity: 0, scale: 0.6, x: -30, y: -30 },
    { opacity: 0.55, scale: 1, x: 0, y: 0, duration: 1.2, ease: "power3.out" },
    "<"
  );

  tl.fromTo(
    "#animalsOrb2",
    { opacity: 0, scale: 0.6, x: 30, y: 30 },
    { opacity: 0.45, scale: 1, x: 0, y: 0, duration: 1.2, ease: "power3.out" },
    "<0.1"
  );

  tl.fromTo(
    "#animalsOrb3",
    { opacity: 0, scale: 0.5 },
    { opacity: 0.3, scale: 1, duration: 1, ease: "power3.out" },
    "<0.2"
  );

  tl.fromTo(
    "#animalsCard",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
    "-=0.5"
  );

  tl.fromTo(
    "#animalsIcon",
    { opacity: 0, scale: 0.4, rotation: -15 },
    { opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: "back.out(1.8)" },
    "-=0.4"
  );

  tl.fromTo(
    "#animalsEyebrow",
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    "-=0.2"
  );

  tl.fromTo(
    "#animalsTitle",
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    "-=0.25"
  );

  tl.fromTo(
    "#animalsBody",
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
    "-=0.2"
  );

  tl.fromTo(
    "#animalsTag",
    { opacity: 0 },
    { opacity: 1, duration: 0.4, ease: "power2.out" },
    "-=0.1"
  );

  tl.fromTo(
    ".animals-tag-line",
    { width: 0 },
    { width: "24px", duration: 0.5, ease: "power3.out" },
    "<"
  );


  let orbsTween = [];
  let orbsCreated = false;

  function startOrbs() {
  if (!orbsCreated) {
    orbTweens = [
      gsap.to("#animalsOrb1", {
        x: 40,
        y: 35,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }),
      gsap.to("#animalsOrb2", {
        x: -35,
        y: -28,
        duration: 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }),
      gsap.to("#animalsOrb3", {
        x: -25,
        y: 20,
        duration: 7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }),
    ];

    orbsCreated = true;
  }

  gsap.to(["#animalsOrb1", "#animalsOrb2", "#animalsOrb3"], {
    opacity: 1,
    duration: 0.3,
  });

  orbTweens.forEach(tween => tween.resume());
}

function stopOrbs() {
  gsap.to(["#animalsOrb1", "#animalsOrb2", "#animalsOrb3"], {
    opacity: 0,
    duration: 0.3,
  });
}

ScrollTrigger.create({
  trigger: "#animals",
  start: "top bottom",
  end: "bottom top",

  onEnter: () => {
    console.log("ENTER animals");
    startOrbs();
    gsap.to(".animals-pattern", { opacity: 1, duration: 0.3 });
  },
  onLeave: () => { 
    console.log("LEAVE animals");
    stopOrbs();
    gsap.to(".animals-pattern", { opacity: 0, duration: 0.3 });
   },
  onEnterBack: () => {  
    console.log("ENTER BACK animals");
    startOrbs();
    gsap.to(".animals-pattern", { opacity: 1, duration: 0.3 });
  },
  onLeaveBack: () => { 
    console.log("LEAVE BACK animals");
    stopOrbs();
    gsap.to(".animals-pattern", { opacity: 0, duration: 0.3 });
  },
});

}