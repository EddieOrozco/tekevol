// ==========================================================================
// Main entry point — runs on every page
// ==========================================================================

import { initNav } from './nav.js';
import { initForms } from './forms.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initForms();
});
