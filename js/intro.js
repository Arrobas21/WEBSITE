window.addEventListener("load", function () {
      const lettersContainer = document.querySelector("#intro .letters");
      const envelope         = document.querySelector("#intro .envelope");
      if (!lettersContainer || !envelope) return;
 
      const letters = Array.from(document.querySelectorAll("#intro .letter"));
 
      // ── Posicionar cartas apiladas con leve offset y rotación ──
      letters.forEach((letter, i) => {
        lettersContainer.appendChild(letter);
        const cw     = lettersContainer.offsetWidth;
        const lw     = letter.offsetWidth;
        const center = cw / 2 - lw / 2;
        letter.style.left = center + "px";
        letter.style.top  = (i * 10) + "px";
        gsap.set(letter, { rotation: (Math.random() - 0.5) * 4, opacity: 0, y: 20 });
      });
 
      // ── GSAP: entrada de la sección ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#intro",
          start: "top 60%",
          once: true,
        }
      });
 
      tl.fromTo(envelope,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0,  scale: 1, duration: 0.8, ease: "power3.out" }
      );
 
      ScrollTrigger.create({
        trigger: "#intro",
        start: "top bottom",
        end: "bottom top",
        onLeave:     () => gsap.to(envelope, { opacity: 0, y: -30, duration: 0.4 }),
        onEnterBack: () => gsap.to(envelope, { opacity: 1, y: 0,   duration: 0.4 }),
        onLeaveBack: () => gsap.to(envelope, { opacity: 0, y: 30,  duration: 0.4 }),
        onEnter:     () => gsap.to(envelope, { opacity: 1, y: 0,   duration: 0.4 }),
      });
 
      // ── Abrir sobre ──
      document.querySelector("#openEnvelope").addEventListener("click", () => {
        envelope.classList.add("active");
 
        gsap.to(letters, {
          opacity: 1,
          y: 0,
          rotation: () => (Math.random() - 0.5) * 5,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.4)",
          delay: 0.3,

           onStart: () => {
            letters.forEach(letter => {
              letter.style.pointerEvents = "auto";
        });
        }
      });
 
      // ── Drag ──
      let zTop = 20;
 
      letters.forEach((letter) => {
        letter.addEventListener("mousedown", (e) => {
          if (e.target.tagName === "BUTTON") return;
 
          const parentRect = lettersContainer.getBoundingClientRect();
          const rect       = letter.getBoundingClientRect();
 
          // FIX: en lugar de clearProps:"transform" (que eliminaba
          // la posición GSAP), convertimos a left/top explícitos
          // y reseteamos solo rotation para el drag.
          gsap.set(letter, {
            left:     rect.left - parentRect.left,
            top:      rect.top  - parentRect.top,
            rotation: 0,
            zIndex:   zTop++,
            x: 0,  // limpiar x/y de GSAP sin borrar left/top
            y: 0,
          });
 
          const offsetX = e.clientX - rect.left;
          const offsetY = e.clientY - rect.top;
 
          const onMouseMove = (ev) => {
            letter.style.left = (ev.clientX - parentRect.left - offsetX) + "px";
            letter.style.top  = (ev.clientY - parentRect.top  - offsetY) + "px";
          };
          const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup",   onMouseUp);
          };
          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup",   onMouseUp);
        });
      });
 
      // ── Cerrar cartas ──
      document.querySelectorAll("#intro .closeLetter").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const letter = e.target.closest(".letter");
          gsap.to(letter, {
            opacity: 0,
            y: 10,
            duration: 0.25,
            onComplete: () => { letter.style.display = "none"; }
          });
        });
      });
    });
  });