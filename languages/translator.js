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

  /**
   * Get the current language from localStorage or default
   */
  function getCurrentLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
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
        var lang = btn.getAttribute('data-lang');
        switchLanguage(lang);
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
