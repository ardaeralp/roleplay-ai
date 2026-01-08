let currentLang = localStorage.getItem("lang") || "tr";
let translations = {};

export async function loadLanguage(lang) {
    const res = await fetch(`./i18n/${lang}.json`);
    translations = await res.json();
    currentLang = lang;
    localStorage.setItem("lang", lang);
    applyTranslations();
}

function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = translations[key] || key;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        el.placeholder = translations[key] || key;
    });
}