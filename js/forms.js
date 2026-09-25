// ==========================================================================
// Forms — contact form handling and basic validation
// ==========================================================================

export function initForms() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        valid = false;
        field.classList.add('input-error');
      } else {
        field.classList.remove('input-error');
      }
    });

    if (!valid) return;

    // TODO: hook this up to your form backend (Formspree, Netlify Forms, etc.)
    console.log('Form submitted:', new FormData(form));
  });
}
