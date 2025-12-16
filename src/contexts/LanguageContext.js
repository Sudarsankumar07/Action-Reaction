import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '../locales/en.json';
import ta from '../locales/ta.json';

const STORAGE_KEY = 'app_language';

const locales = { en, ta };

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key, fallback) => fallback || key,
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');
  const [translations, setTranslations] = useState(locales.en);

  useEffect(() => {
    // load saved language
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored && locales[stored]) {
          setLanguageState(stored);
          setTranslations(locales[stored]);
          console.log('[LanguageContext] loaded language:', stored);
        }
      } catch (e) {
        // ignore
        console.warn('Language load error', e.message);
      }
    })();
  }, []);

  const setLanguage = async (lang) => {
    if (!locales[lang]) return;
    setLanguageState(lang);
    setTranslations(locales[lang]);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      console.warn('Language save error', e.message);
    }
  };

  const t = (key, fallback) => {
    // support nested keys like 'topics.food'
    const parts = key.split('.');
    let cur = translations;
    for (let p of parts) {
      if (!cur) return fallback || key;
      cur = cur[p];
    }
    return cur === undefined ? fallback || key : cur;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export default LanguageContext;
