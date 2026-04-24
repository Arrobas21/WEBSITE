function initLoader(loader) {
  if (!loader) return;

  gsap.to(loader, {
    opacity: 0,
    duration: 1,
    delay: 3.2,
    onComplete: () => {
      loader.remove();
      document.body.classList.remove("no-scroll");
      ScrollTrigger.refresh();
    },
  });
}