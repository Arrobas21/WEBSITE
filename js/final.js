function crearConfetti() {
  const container = document.getElementById("finalConfetti");
  if (!container) return;

  const CONFETTI_COLORS = [
    "#F2C6D4",
    "#CFE8EE",
    "#E2D6F3",
    "#C8A97E",
    "#F9EEF3",
  ];

  for (let i = 0; i < 55; i++) {
    const piece = document.createElement("div");
    const size = 4 + Math.random() * 7;
    const left = 5 + Math.random() * 90;
    const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    const shape = i % 3;

    piece.className = "confetti-piece";
    piece.style.cssText = `
      width:${size}px;
      height:${size}px;
      background:${color};
      left:${left}%;
      top:-20px;
      opacity:0;
      border-radius:${shape === 0 ? "50%" : shape === 1 ? "2px" : "0"};
    `;

    container.appendChild(piece);
  }
}

function initFinalAnimation() {
  const selectorsToClear = [
    "#finalTopline",
    "#finalEyebrow",
    "#finalTitle",
    "#finalDivider",
    "#finalSub",
    "#finalSig",
    "#finalFooter",
  ];

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#final",
      start: "top 60%",
      once: true,
    },
    onComplete: () => {
      gsap.set(selectorsToClear, { clearProps: "all" });
    },
  });

  tl.fromTo(
    "#finalTopline",
    { width: 0 },
    { width: "60px", duration: 0.7, ease: "power3.out" }
  )
    .fromTo(
      "#finalEyebrow",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(
      "#finalTitle",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
      "-=0.2"
    )
    .fromTo(
      "#finalDivider",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.8)" },
      "-=0.3"
    )
    .fromTo(
      "#finalSub",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.1"
    )
    .fromTo(
      "#finalSig",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.1"
    )
    .fromTo(
      "#finalFooter",
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.2"
    );

  const pieces = document.querySelectorAll(".confetti-piece");

  tl.to(
    pieces,
    {
      opacity: 1,
      y: () => 280 + Math.random() * 200,
      x: () => (Math.random() - 0.5) * 120,
      rotation: () => Math.random() * 720,
      duration: () => 1.8 + Math.random() * 1.4,
      ease: "power1.out",
      stagger: { each: 0.04, from: "random" },
      onComplete: () => {
        gsap.to(pieces, {
          opacity: 0,
          duration: 0.8,
          stagger: { each: 0.02, from: "random" },
          onComplete: () => {
            gsap.set(pieces, { y: 0, x: 0, rotation: 0, opacity: 0 });
          },
        });
      },
    },
    "-=0.4"
  );
}