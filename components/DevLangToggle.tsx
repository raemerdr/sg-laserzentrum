"use client";

import { useLang } from "./LangProvider";
import styles from "./DevLangToggle.module.css";

/**
 * Floating DE / EN switch for reading the German copy while building.
 * Not rendered in production builds, so the live site stays German-only.
 */
export default function DevLangToggle() {
  const { lang, setLang, t } = useLang();
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className={styles.toggle} role="group" aria-label={t.a11y.devLang}>
      <span className={`t-mono ${styles.tag}`}>Dev</span>
      {(["de", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          className={`t-mono ${styles.option}`}
          data-active={lang === l}
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
