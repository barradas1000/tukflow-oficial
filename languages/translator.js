/**
 * TukFlow Translator - Shared Translation System
 * Handles language loading, switching, and applying translations
 * Supports: pt (Portuguese), en (English), es (Spanish), fr (French)
 */

(function () {
  'use strict';

  var SUPPORTED_LANGS = ['pt', 'en', 'es', 'fr'];
  var DEFAULT_LANG = 'pt';
  var STORAGE_KEY = 'tukflow_lang';
  var LEGACY_STORAGE_KEY = 'lang';

  /**
   * Get the current language from localStorage or default
   */
  function getCurrentLang() {
    var stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.indexOf(stored) !== -1) {
      return stored;
    }
    return DEFAULT_LANG;
  }

  /**
   * Load a language script dynamically
   */
  function loadLanguageScript(lang, callback) {
    var oldScript = document.getElementById('langScript');
    if (oldScript) {
      oldScript.parentNode.removeChild(oldScript);
    }

    var script = document.createElement('script');
    script.id = 'langScript';
    // Detect correct path based on current page location
    var langPath = 'languages/' + lang + '.js';
    // If page is in a subdirectory (e.g., /oficial/paginas/), adjust path
    var pathParts = window.location.pathname.split('/');
    if (pathParts.length > 2) {
      var depth = pathParts.length - 2; // account for filename
      langPath = '';
      for (var i = 0; i < depth; i++) {
        langPath += '../';
      }
      langPath += 'languages/' + lang + '.js';
    }
    script.src = langPath;
    script.onload = function () {
      if (typeof callback === 'function') {
        callback();
      }
    };
    script.onerror = function () {
      console.error('[TukFlow Translator] Failed to load language: ' + lang);
      // Fallback to default language
      if (lang !== DEFAULT_LANG) {
        loadLanguageScript(DEFAULT_LANG, callback);
      }
    };
    document.head.appendChild(script);
  }

  /**
   * Apply translations to all elements with data-i18n attribute
   */
  function applyTranslations() {
    var t = window.translations || {};
    var elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!t[key]) return;

      var translation = t[key];

      // Handle elements with innerHTML (for HTML content like <span> tags)
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = translation;
      }
      // Handle placeholder attributes
      else if (el.hasAttribute('data-i18n-placeholder')) {
        el.setAttribute('placeholder', translation);
      }
      // Handle value attributes (for input buttons)
      else if (el.hasAttribute('data-i18n-value')) {
        el.setAttribute('value', translation);
      }
      // Handle title attributes
      else if (el.hasAttribute('data-i18n-title')) {
        el.setAttribute('title', translation);
      }
      // Default: set textContent
      else {
        el.textContent = translation;
      }
    });
  }

  /**
   * Switch to a specific language
   */
  function switchLanguage(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) === -1) return;

    localStorage.setItem(STORAGE_KEY, lang);
    localStorage.setItem(LEGACY_STORAGE_KEY, lang);

    // Update language selector UI if it exists
    var currentLangEl = document.getElementById('currentLang');
    if (currentLangEl) {
      // Update the text label (e.g., "PT")
      var langText = document.getElementById('currentLangText');
      if (langText) {
        langText.textContent = lang.toUpperCase();
      } else {
        currentLangEl.textContent = lang.toUpperCase();
      }
      // Update the flag
      var flagEl = document.getElementById('currentFlag');
      if (flagEl) {
        var flags = { pt: '🇵🇹', en: '🇬🇧', es: '🇪🇸', fr: '🇫🇷' };
        flagEl.textContent = flags[lang] || '🇵🇹';
      }
    }
    var currentLangMobileEl = document.getElementById('currentLangMobile');
    if (currentLangMobileEl) {
      currentLangMobileEl.textContent = lang.toUpperCase();
    }
    var currentFlagMobileEl = document.getElementById('currentFlagMobile');
    if (currentFlagMobileEl) {
      var mobileFlags = { pt: '🇵🇹', en: '🇬🇧', es: '🇪🇸', fr: '🇫🇷' };
      currentFlagMobileEl.textContent = mobileFlags[lang] || '🇵🇹';
    }
    // Update active state in dropdown
    document.querySelectorAll('.lang-option').forEach(function (opt) {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });

    loadLanguageScript(lang, function () {
      applyTranslations();
      // Dispatch a custom event so other scripts can react
      var event = new CustomEvent('languageChanged', { detail: { lang: lang } });
      document.dispatchEvent(event);
    });
  }

  /**
   * Initialize the translator
   */
  function init() {
    var currentLang = getCurrentLang();

    // Set up language selector buttons
    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var lang = btn.getAttribute('data-lang');
        switchLanguage(lang);
        document.querySelectorAll('.nav-dropdown, .lang-dropdown').forEach(function (dropdown) {
          dropdown.classList.remove('is-open', 'show');
          if (!dropdown.classList.contains('nav-dropdown')) {
            dropdown.classList.add('opacity-0', 'invisible');
          }
        });
      });
    });

    [
      ['langSelectorBtn', 'langDropdown'],
      ['langSelectorBtnMobile', 'langDropdownMobile']
    ].forEach(function (pair) {
      var trigger = document.getElementById(pair[0]);
      var dropdown = document.getElementById(pair[1]);
      if (!trigger || !dropdown) return;
      if (dropdown.classList.contains('nav-dropdown')) return;

      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('is-open');
        dropdown.classList.toggle('show');
        dropdown.classList.toggle('opacity-0');
        dropdown.classList.toggle('invisible');
      });

      dropdown.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    });

    // Load the saved language
    loadLanguageScript(currentLang, function () {
      applyTranslations();
    });
  }

  // Expose public API
  window.TukFlowTranslator = {
    init: init,
    switchLanguage: switchLanguage,
    applyTranslations: applyTranslations,
    getCurrentLang: getCurrentLang,
    SUPPORTED_LANGS: SUPPORTED_LANGS
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
