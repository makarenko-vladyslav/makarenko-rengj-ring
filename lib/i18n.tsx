"use client";
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import content from '@/lib/content.json';

type Dict = Record<string, unknown>;

const LocaleContext = createContext<{ locale: string; setLocale: (l: string) => void; t: (path: string) => unknown }>({
  locale: content.defaultLocale,
  setLocale: () => {},
  t: () => '',
});

function lookup(root: unknown, keys: string[]): unknown {
  let cur: unknown = root;
  for (const k of keys) {
    const isObj = cur !== null && typeof cur === 'object';
    if (!isObj) return undefined;
    const dict = cur as Dict;
    if (!(k in dict)) return undefined;
    cur = dict[k];
  }
  return cur;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState(content.defaultLocale);

  useEffect(() => {
    const saved = localStorage.getItem('locale');
    const locales = content.locales as Dict;
    if (saved && saved !== content.defaultLocale && saved in locales) setLocaleState(saved);
  }, []);

  const setLocale = useCallback((l: string) => {
    setLocaleState(l);
    if (typeof window !== 'undefined') localStorage.setItem('locale', l);
  }, []);

  const t = useCallback((path: string): unknown => {
    const keys = path.split('.');
    const locales = content.locales as Record<string, Dict>;
    const found = lookup(locales[locale], keys);
    if (found !== undefined) return found;
    const fallback = lookup(locales[content.defaultLocale], keys);
    return fallback ?? path;
  }, [locale]);

  return <LocaleContext value={{ locale, setLocale, t }}>{children}</LocaleContext>;
}

export function useLocale() { return useContext(LocaleContext); }
