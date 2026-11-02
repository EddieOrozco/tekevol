/* Mobile navigation toggle */
(function () {
  var header = document.querySelector('header');
  var toggle = header && header.querySelector('.nav-toggle');
  var menu = header && header.querySelector('.header-menu');
  if (!toggle || !menu) return;
 
  // Must match the breakpoint in the CSS (max-width: 900px)
  var desktop = window.matchMedia('(min-width: 901px)');
 
  function setOpen(open) {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  }
 
  toggle.addEventListener('click', function () {
    setOpen(!header.classList.contains('is-open'));
  });
 
  // Close after choosing a link
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
 
  // Close on Escape and return focus to the button
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
 
  // Close when tapping outside the header
  document.addEventListener('click', function (e) {
    if (header.classList.contains('is-open') && !header.contains(e.target)) setOpen(false);
  });
 
  // Reset if the viewport grows to desktop while the menu is open
  desktop.addEventListener('change', function (e) {
    if (e.matches) setOpen(false);
  });
})();