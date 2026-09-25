// ==========================================================================
// Forms — contact form + quote form handling and validation
// Called from main.js via initForms()
// ==========================================================================

export function initForms() {
  initContactForm();
  initQuoteForm();
}

/* ---------- Contact form (contact.html) ---------- */
function initContactForm() {
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
    console.log('Form submitted:', Object.fromEntries(new FormData(form)));
  });
}

/* ---------- Quote form (final CTA section) ---------- */
function initQuoteForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const submitBtn = form.querySelector('.quote-form__submit');
  const successBox = form.querySelector('.quote-form__success');
  const btnText = submitBtn.textContent;

  const messages = {
    name: 'Please enter your name.',
    phone: 'Please enter a valid phone number.',
    email: 'Please enter a valid email address.',
    trade: 'Please choose your trade.',
  };

  function validateField(field) {
    const wrap = field.closest('.quote-form__field');
    const errorEl = wrap && wrap.querySelector('.quote-form__error');
    let valid = field.checkValidity();

    // Phone: require at least 10 digits
    if (field.name === 'phone') {
      valid = field.value.replace(/\D/g, '').length >= 10;
    }

    if (wrap) wrap.classList.toggle('is-invalid', !valid);
    field.setAttribute('aria-invalid', String(!valid));
    if (errorEl) errorEl.textContent = valid ? '' : messages[field.name] || 'Required.';
    return valid;
  }

  const fields = form.querySelectorAll('input[required], select[required]');

  fields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.is-invalid')) validateField(field);
    });
  });

  // Light phone formatting: (555) 123-4567
  const phone = form.querySelector('input[name="phone"]');
  if (phone) {
    phone.addEventListener('input', () => {
      const d = phone.value.replace(/\D/g, '').slice(0, 10);
      if (d.length > 6) phone.value = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
      else if (d.length > 3) phone.value = `(${d.slice(0, 3)}) ${d.slice(3)}`;
      else phone.value = d;
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot — bots fill this, humans don't
    if (form.company && form.company.value) return;

    let firstInvalid = null;
    fields.forEach((f) => {
      if (!validateField(f) && !firstInvalid) firstInvalid = f;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      // Swap action="#" for your endpoint (Formspree, Netlify, etc.)
      const action = form.getAttribute('action');
      if (action && action !== '#') {
        const res = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error('Request failed');
      }

      form
        .querySelectorAll('.quote-form__field, .quote-form__row, .quote-form__submit, .quote-form__note')
        .forEach((el) => (el.hidden = true));
      successBox.hidden = false;
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = btnText;
      alert('Something went wrong. Please call us at (555) 555-5555.');
    }
  });
}

// js/forms.js — validation + async submit for .contact-form
// Works with Formspree, Netlify Forms, Basin, etc. Set the form's
// action="" to your endpoint. Without JS the form still posts normally.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const status = form.querySelector(".form-status");
  const submitBtn = form.querySelector('[type="submit"]');
  const btnText = submitBtn.textContent;

  const showError = (field, show) => {
    const err = document.getElementById(`${field.id}-error`);
    field.setAttribute("aria-invalid", show ? "true" : "false");
    if (err) {
      err.hidden = !show;
      if (show) field.setAttribute("aria-describedby", err.id);
      else field.removeAttribute("aria-describedby");
    }
  };

  // Clear an error as soon as the user fixes it
  form.querySelectorAll("[required]").forEach((field) => {
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true" && field.checkValidity()) {
        showError(field, false);
      }
    });
    field.addEventListener("change", () => {
      if (field.checkValidity()) showError(field, false);
    });
  });

  const setStatus = (msg, type) => {
    status.textContent = msg;
    status.className = `form-status is-${type}`;
    status.hidden = false;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate
    let firstInvalid = null;
    form.querySelectorAll("[required]").forEach((field) => {
      const ok = field.checkValidity();
      showError(field, !ok);
      if (!ok && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // Honeypot: silently drop bot submissions
    if (form.company_url && form.company_url.value) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    status.hidden = true;

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(res.statusText);

      form.reset();
      setStatus("Thanks! Your audit request is in. We'll get back to you within one business day.", "success");
    } catch (err) {
      setStatus("Something went wrong sending your request. Please try again or call us directly.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = btnText;
      status.focus?.();
    }
  });
});