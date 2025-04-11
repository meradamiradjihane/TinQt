import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// On importe les fichiers de traduction
import fr from './trad/fr.json'
import en from './trad/en.json'

i18n
  .use(LanguageDetector) // détecte automatiquement la langue du navigateur
  .use(initReactI18next) // lie i18next à React
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en }
    },
    fallbackLng: 'fr', // si aucune langue détectée → français par défaut
    interpolation: {
      escapeValue: false // sécurité pour React (évite l'encodage HTML)
    }
  })

export default i18n
