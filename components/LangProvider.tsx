"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { COPY, type Copy, type Lang } from "@/lib/content";

const STORAGE_KEY = "sg-dev-lang";

/**
 * The language lives outside React so the server always renders German and the
 * client picks up the saved dev preference during hydration.
 */
const listeners = new Set<() => void>();
let current: Lang | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): Lang {
  if (current) return current;
  try {
    current = window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "de";
  } catch {
    current = "de";
  }
  return current;
}

function getServerSnapshot(): Lang {
  return "de";
}

function setLangExternal(next: Lang) {
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* storage unavailable — the choice just will not persist */
  }
  listeners.forEach((cb) => cb());
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Copy };

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang: setLangExternal, t: COPY[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}

/** Shorthand for components that only need the copy. */
export function useCopy(): Copy {
  return useLang().t;
}
