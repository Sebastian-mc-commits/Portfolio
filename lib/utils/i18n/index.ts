import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en";
import es from "./translations/es";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en
            },
            es: {
                translation: es
            },
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export function detectAndSetLanguage(): void {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const langParam = params.get("lang");

    if (langParam === "en" || langParam === "es") {
        if (i18n.language !== langParam) {
            i18n.changeLanguage(langParam);
        }
        return;
    }

    const browserLang = navigator.language.split("-")[0];
    const targetLang = browserLang === "es" ? "es" : "en";

    if (i18n.language !== targetLang) {
        i18n.changeLanguage(targetLang);
        const url = new URL(window.location.href);
        url.searchParams.set("lang", targetLang);
        window.history.replaceState({}, "", url.toString());
    }
}

export default i18n
