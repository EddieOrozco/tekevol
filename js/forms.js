/**
 * Tekevol: contact form → HubSpot Forms API (v3)
 * ------------------------------------------------------------
 * Sends the custom HTML form on contact.html straight to HubSpot.
 * No API key needed: the Portal ID and Form GUID are public values.
 * Never put a private app token in front-end code.
 *
 * Every field `name` in the HTML must match a HubSpot internal
 * property name, and dropdown/radio `value`s must match the option
 * internal values in HubSpot exactly (case-sensitive).
 */
(function () {
  'use strict';

  // ---- HubSpot config -------------------------------------------------
  const HUBSPOT = {
    portalId: '247609198',
    formGuid: 'abdd20c5-f2ab-4187-92d5-4a0e0e58b3ac',
    // The account is in the na2 region. Try the regional host first,
    // then fall back to the global host if that one can't be reached.
    hosts: ['https://api-na2.hsforms.com', 'https://api.hsforms.com'],
  };

  // HTML field names = HubSpot internal property names.
  const FIELDS = [
    'firstname',
    'lastname',
    'email',
    'phone',
    'company',
    'website',
    'trade_industry',
    'service_interest',
    'has_website',
    'message',
  ];

  // Spam protection
  const HONEYPOT_NAME = 'fax_number'; // hidden field humans never see
  const MIN_FILL_TIME_MS = 3000;      // bots usually submit instantly

  const MESSAGES = {
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    phone: 'Please enter a 10-digit phone number.',
    generic:
      "Something went wrong and your message wasn't sent. Please try again, or email us at eddie@tekevol.com.",
  };

  // ---- Helpers ----------------------------------------------------------
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  // Lets people type "joesplumbing.com" without the https://
  function normalizeUrl(value) {
    if (!value) return value;
    return /^https?:\/\//i.test(value) ? value : 'https://' + value;
  }

  function digitsOnly(value) {
    return (value || '').replace(/\D/g, '');
  }

  // A single "Name" field → HubSpot firstname + lastname
  function splitFullName(value) {
    const parts = (value || '').trim().split(/\s+/).filter(Boolean);
    return { firstname: parts.shift() || '', lastname: parts.join(' ') };
  }

  function pushEvent(event, extra) {
    // Ready for Google Tag Manager / GA4 once GTM is installed.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: event }, extra || {}));
  }

  class SubmitError extends Error {
    constructor(status, body) {
      super('HubSpot submission failed (' + status + ')');
      this.status = status;
      this.body = body;
    }
  }

  // ---- Field-level validation UI ---------------------------------------
  function getErrorEl(field) {
    // Supports both the contact page (.form-field) and home page (.quote-form__field) markup
    const wrapper = field.closest('.form-field, .quote-form__field');
    return wrapper ? wrapper.querySelector('.form-error, .quote-form__error') : null;
  }

  function setFieldError(field, message) {
    const errorEl = getErrorEl(field);
    field.setAttribute('aria-invalid', 'true');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = false;
    }
  }

  function clearFieldError(field) {
    const errorEl = getErrorEl(field);
    field.removeAttribute('aria-invalid');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.hidden = true;
    }
  }

  function validateField(field) {
    const value = field.value.trim();

    if (field.required && !value) {
      setFieldError(field, MESSAGES.required);
      return false;
    }
    if (field.type === 'email' && value && !field.checkValidity()) {
      setFieldError(field, MESSAGES.email);
      return false;
    }
    if (field.name === 'phone' && value) {
      const digits = digitsOnly(value);
      // Accept 10 digits, or 11 starting with a US "1"
      if (!(digits.length === 10 || (digits.length === 11 && digits[0] === '1'))) {
        setFieldError(field, MESSAGES.phone);
        return false;
      }
    }
    clearFieldError(field);
    return true;
  }

  function validateForm(form) {
    const fields = form.querySelectorAll('input:not([type="radio"]):not([name="' + HONEYPOT_NAME + '"]), select, textarea');
    let firstInvalid = null;
    fields.forEach(function (field) {
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  // ---- Build + send -----------------------------------------------------
  function buildPayload(form) {
    const data = new FormData(form);
    const fields = [];

    // Home page form uses one "Name" field (name="fullname")
    if (data.has('fullname')) {
      const split = splitFullName(data.get('fullname').toString());
      data.set('firstname', split.firstname);
      if (split.lastname) data.set('lastname', split.lastname);
    }

    FIELDS.forEach(function (name) {
      let value = (data.get(name) || '').toString().trim();
      if (!value) return; // skip empty optional fields
      if (name === 'website') value = normalizeUrl(value);
      fields.push({ objectTypeId: '0-1', name: name, value: value });
    });

    const context = {
      pageUri: window.location.href,
      pageName: document.title,
    };
    // Links the submission to the visitor's page history once the
    // HubSpot tracking code is installed on the site.
    const hutk = getCookie('hubspotutk');
    if (hutk) context.hutk = hutk;

    return { submittedAt: Date.now(), fields: fields, context: context };
  }

  async function submitToHubSpot(payload) {
    let lastError = null;

    for (const host of HUBSPOT.hosts) {
      const url =
        host + '/submissions/v3/integration/submit/' + HUBSPOT.portalId + '/' + HUBSPOT.formGuid;

      let res;
      try {
        res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (networkErr) {
        lastError = networkErr; // host unreachable → try the next one
        continue;
      }

      const body = await res.json().catch(function () { return {}; });
      if (res.ok) return body;
      if (res.status === 404) {
        lastError = new SubmitError(res.status, body); // wrong host/region → try next
        continue;
      }
      throw new SubmitError(res.status, body); // real error (bad value, etc.)
    }

    throw lastError || new Error('No HubSpot host reachable');
  }

  // Map HubSpot's validation errors back onto the matching field when possible.
  function showServerErrors(form, err) {
    const errors = (err && err.body && err.body.errors) || [];
    let mapped = false;

    errors.forEach(function (e) {
      const match = /fields\.([a-z_]+)/i.exec(e.message || '');
      const field = match && form.querySelector('[name="' + match[1] + '"]');
      if (field) {
        setFieldError(
          field,
          e.errorType === 'INVALID_EMAIL' ? MESSAGES.email : 'Please check this field.'
        );
        mapped = true;
      }
    });

    return mapped;
  }

  // ---- Init ---------------------------------------------------------------
  function initContactForm(form) {
    const submitBtn = form.querySelector('[type="submit"]');
    const statusEl = form.querySelector('.form-status, .quote-form__status');
    // Success box: either by id (data-success-target) or a .quote-form__success inside the form
    const successEl =
      document.getElementById(form.dataset.successTarget || '') ||
      form.querySelector('.form-success, .quote-form__success');
    const formName = form.id || 'form';
    const honeypot = form.querySelector('[name="' + HONEYPOT_NAME + '"]');
    const loadedAt = Date.now();
    const btnLabel = submitBtn ? submitBtn.textContent : '';

    // Validate as people leave each field, and clear errors as they fix them
    form.addEventListener('focusout', function (e) {
      if (e.target.matches('input, select, textarea') && e.target.name !== HONEYPOT_NAME) {
        if (e.target.type !== 'radio') validateField(e.target);
      }
    });
    form.addEventListener('input', function (e) {
      if (e.target.getAttribute('aria-invalid') === 'true') validateField(e.target);
    });

    function setLoading(isLoading) {
      if (!submitBtn) return;
      submitBtn.disabled = isLoading;
      submitBtn.setAttribute('aria-busy', String(isLoading));
      submitBtn.textContent = isLoading ? 'Sending…' : btnLabel;
    }

    function showStatus(message) {
      if (!statusEl) return;
      statusEl.textContent = message;
      statusEl.hidden = !message;
    }

    function showSuccess() {
      if (successEl && form.contains(successEl)) {
        // Success message lives inside the form: hide everything else, keep the form box
        Array.prototype.forEach.call(form.children, function (child) {
          if (child !== successEl && !child.classList.contains('quote-form__title')) child.hidden = true;
        });
      } else {
        form.hidden = true;
      }
      if (successEl) {
        successEl.hidden = false;
        successEl.focus();
      }
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      showStatus('');

      // Bot checks: pretend it worked so bots don't retry, but send nothing.
      const tooFast = Date.now() - loadedAt < MIN_FILL_TIME_MS;
      if ((honeypot && honeypot.value) || tooFast) {
        showSuccess();
        return;
      }

      if (!validateForm(form)) return;

      setLoading(true);
      try {
        await submitToHubSpot(buildPayload(form));
        pushEvent('lead_form_submit', {
          form_id: formName,
          trade_industry: form.trade_industry ? form.trade_industry.value : '',
          service_interest: form.service_interest ? form.service_interest.value : '',
        });
        form.reset();
        showSuccess();
      } catch (err) {
        console.error('[forms.js]', err, err && err.body);
        const mapped = showServerErrors(form, err);
        showStatus(mapped ? 'Please fix the highlighted field and try again.' : MESSAGES.generic);
        pushEvent('lead_form_error', { form_id: formName, error_status: (err && err.status) || 'network' });
      } finally {
        setLoading(false);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('form[data-hubspot-form]').forEach(initContactForm);
  });
})();