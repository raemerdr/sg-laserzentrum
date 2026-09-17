"use client";

import { useEffect, useRef } from "react";
import { useCopy } from "../LangProvider";
import styles from "./IntroOverlay.module.css";

export const INTRO_EVENT = "sg:intro-done";
const SEEN_KEY = "sg-intro-seen";

/**
 * <html data-intro>: "play" (black screen, page held) → "reveal" (black
 * fades while the hero word rises) → "done" (overlay gone, scroll released).
 */
export default function IntroOverlay() {
  const t = useCopy();
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "play") return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      root.dataset.intro = "done";
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* storage blocked: the intro simply plays again next visit */
      }
      window.dispatchEvent(new Event(INTRO_EVENT));
    };
    finishRef.current = finish;

    const reveal = window.setTimeout(() => {
      if (!finished) root.dataset.intro = "reveal";
    }, 1350);
    const done = window.setTimeout(finish, 2250);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);

    // Only timers are cleared here: the effect re-runs in development
    // (Strict Mode), and the head script releases the page if this never
    // finishes.
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(done);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className={styles.overlay} aria-hidden="true" onClick={() => finishRef.current()}>
      <div className={styles.group}>
        <span className={`t-mono ${styles.label}`}>{t.intro.lead}</span>
        <span className={styles.ticker}>
          <span className={styles.track}>
            {t.intro.words.map((w) => (
              <span key={w} className={`t-mono ${styles.label}`}>
                {w}
              </span>
            ))}
          </span>
        </span>
      </div>
    </div>
  );
}
