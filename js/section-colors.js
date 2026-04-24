function initSectionColors(secs) {
  secs.forEach(({ id, color }) => {
    const el = document.getElementById(id);
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 55%",
      onEnter: () =>
        gsap.to(document.body, {
          backgroundColor: color,
          duration: 0.9,
          ease: "power2.inOut",
          overwrite: "auto",
        }),
      onEnterBack: () =>
        gsap.to(document.body, {
          backgroundColor: color,
          duration: 0.9,
          ease: "power2.inOut",
          overwrite: "auto",
        }),
    });
  });

  gsap.set(document.body, { backgroundColor: secs[0].color });
}

function initSectionContentAnimation() {
  const cajas = document.querySelectorAll(".section-content");

  cajas.forEach((caja) => {
    gsap.fromTo(
      caja,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: caja,
          start: "top 70%",
          toggleActions: "restart reverse restart reverse",
        },
      }
    );
  });
}