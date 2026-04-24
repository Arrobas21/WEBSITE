window.addEventListener("load", () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  document.body.classList.add("no-scroll");
  window.scrollTo(0, 0);

  gsap.registerPlugin(ScrollTrigger);

  const secs = [
    { id: "intro", color: "#FFFDE5" },
    { id: "birthday", color: "#F9EEF3" },
    { id: "animals", color: "#EEF5F9" },
    { id: "likes", color: "#F3F0FA" },
    { id: "message", color: "#FFF8EE" },
    { id: "final", color: "#FFFDE5" },
  ];

  const progressBar = document.getElementById("progress-bar");
  const loader = document.querySelector(".page-loader");

  initProgressBar(progressBar);
  initSectionColors(secs);
  initSectionContentAnimation();
  initLoader(loader);
  crearConfetti();
  initFinalAnimation();
  initBirthdayAnimation();
  initAnimalsAnimation();
  animarLikes();
});