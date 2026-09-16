"use client";

import { useLang } from "./LangProvider";

/**
 * Floating DE / EN switch. Development only — it is not rendered in a
 * production build, so the live site stays German-only.
 */
export default function DevLangToggle() {
  const { lang, setLang } = useLang();
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="devlang" role="group" aria-label="Sprache umschalten (nur Entwicklung)">
      <span className="devlang__tag">DEV</span>
      <button type="button" data-active={lang === "de"} onClick={() => setLang("de")}>
        DE
      </button>
      <button type="button" data-active={lang === "en"} onClick={() => setLang("en")}>
        EN
      </button>
    </div>
  );
}
