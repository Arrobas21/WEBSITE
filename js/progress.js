function initProgressBar(progressBar) {
  window.addEventListener("scroll", () => {
    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressBar.style.width = `${pct}%`;
  });
}