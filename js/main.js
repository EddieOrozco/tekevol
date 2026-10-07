// ==========================================================================
// Main entry point — runs on every page
// ==========================================================================

/* ===== Problem Section reveal ===== */
(function () {
  const items = document.querySelectorAll('.ps-reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  document.documentElement.classList.add('js-reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(el => observer.observe(el));
})();

/* ===== Footer year ===== */
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});