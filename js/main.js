// ==========================================================================
// Main entry point — runs on every page
// ==========================================================================

import { initNav } from './nav.js';
import { initForms } from './forms.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initForms();
});

/* ===== Problem Section ===== */
    (function () {
      const items = document.querySelectorAll('.ps-reveal');
      if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('is-visible'));
        return;
      }
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

    document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});
