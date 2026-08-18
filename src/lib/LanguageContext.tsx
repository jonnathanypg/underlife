'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { DICTIONARY, Language } from './dictionaries';

export type { Language };
export { DICTIONARY };

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('es');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('underlife_lang') as Language;
      if (saved === 'es' || saved === 'en' || saved === 'pt') {
        setLangState(saved);
      } else {
        // Auto detect browser language
        const browserLang = navigator.language.slice(0, 2);
        if (browserLang === 'en' || browserLang === 'pt') {
          setLangState(browserLang);
        }
      }
    } catch (e) {
      // Ignore SSR / localStorage errors
    }
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('underlife_lang', newLang);
    } catch (e) {}
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('underlife:lang-changed', { detail: { lang: newLang } }));
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      return DICTIONARY[lang]?.[key] || DICTIONARY['es']?.[key] || key;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useTranslations(namespace?: string) {
  const { t } = useLanguage();
  return useCallback(
    (key: string): string => {
      const fullKey = namespace ? `${namespace}.${key}` : key;
      return t(fullKey);
    },
    [t, namespace]
  );
}

export function useLocale(): Language {
  const { lang } = useLanguage();
  return lang;
}
