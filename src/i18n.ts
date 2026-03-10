import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Recursos de traducciones
import es from './locales/es.json';
import en from './locales/en.json';
import de from './locales/de.json';
import pt from './locales/pt.json';
import zh from './locales/zh.json';
import th from './locales/th.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            es: { translation: es },
            en: { translation: en },
            de: { translation: de },
            pt: { translation: pt },
            zh: { translation: zh },
            th: { translation: th },
        },
        fallbackLng: 'es',
        lng: 'es',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
