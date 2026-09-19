import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS, LANGUAGES } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('agri_connect_lang') || 'en';
  });

  const setLanguage = (langCode) => {
    setLanguageState(langCode);
    localStorage.setItem('agri_connect_lang', langCode);
  };

  const t = (key, fallback = '') => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS['en'];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English if translation key is missing in active language
    return TRANSLATIONS['en'][key] || fallback || key;
  };

  const currentLanguageObj = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES, currentLanguageObj }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
