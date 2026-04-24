function initBirthdayAnimation() {
  const EDAD = 25;
  const DURACION_CONTADOR = 2.0;
  const counter = { val: 0 };

  function animarContador() {
    gsap.to(counter, {
      val: EDAD,
      duration: DURACION_CONTADOR,
      ease: "power2.out",
      roundProps: "val",
      onUpdate: () => {
        const el = document.getElementById("bdayNum");
        if (el) el.textContent = counter.val;
      },
    });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#birthday",
      start: "top 60%",
      once: true,
      onEnter: animarContador,
    },
  });

  tl.fromTo(
    "#bdayLeft",
    { x: -60, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
  )
    .fromTo(
      "#bdayRight",
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "<"
    )
    .fromTo(
      ".bday-left-line",
      { height: "0%" },
      { height: "80%", duration: 0.7, ease: "power2.inOut" },
      "-=0.3"
    )
    .fromTo(
      "#bdayEyebrow",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(
      "#bdayTitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(
      "#bdayBody",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
      "-=0.2"
    )
    .fromTo(
      "#bdayTag",
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" },
      "-=0.1"
    )
    .fromTo(
      ".bday-tag-line",
      { width: 0 },
      { width: "28px", duration: 0.5, ease: "power3.out" },
      "<"
    )
    .fromTo(
      "#bdayNum",
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.6)" },
      0.1
    );
}