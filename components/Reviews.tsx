"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCopy } from "./LangProvider";
import Stars from "./Stars";

const GAP = 20;
const INTERVAL_MS = 4500;

/** One page is every card currently in view, so each move shows a fresh set. */
function pageWidth(el: HTMLElement) {
  return el.clientWidth + GAP;
}

export default function Reviews() {
  const t = useCopy();
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [paused, setPaused] = useState(false);

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: pageWidth(el) * dir, behavior: "smooth" });
  }, []);

  // Advance one full set of reviews at a time; wrap back to the first at the end.
  // Only DOM scrolling happens here — onScroll keeps the arrows in sync.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      const el = railRef.current;
      if (!el || el.scrollWidth <= el.clientWidth) return;
      const finished = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      el.scrollTo({ left: finished ? 0 : el.scrollLeft + pageWidth(el), behavior: "smooth" });
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section id="bewertungen" className="reviews">
      <div className="reviews__head">
        <span className="eyebrow eyebrow--dark">{t.reviews.label}</span>
        <h2 className="h-display">{t.reviews.title}</h2>
        <p className="body-light">{t.reviews.intro}</p>
      </div>

      <div
        className="reviews__carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <ul className="reviews__rail" ref={railRef} onScroll={measure}>
          {t.reviews.items.map((r) => (
            <li key={r.name} className="review">
              <Stars label={`${r.name}: 5/5`} />
              <blockquote>{r.quote}</blockquote>
              <cite>{r.name}</cite>
            </li>
          ))}
        </ul>

        <div className="reviews__nav">
          <button type="button" aria-label={t.reviews.prev} onClick={() => step(-1)} disabled={atStart}>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9.57 5.4a.75.75 0 0 1 1.06 1.06L5.56 11.5H20.5a.75.75 0 0 1 0 1.5H5.56l5.07 5.04a.75.75 0 1 1-1.06 1.06l-6.6-6.57a.75.75 0 0 1 0-1.06l6.6-6.57Z" />
            </svg>
          </button>
          <button type="button" aria-label={t.reviews.next} onClick={() => step(1)} disabled={atEnd}>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.43 5.4a.75.75 0 0 0-1.06 1.06L18.44 11.5H3.5a.75.75 0 0 0 0 1.5h14.94l-5.07 5.04a.75.75 0 1 0 1.06 1.06l6.6-6.57a.75.75 0 0 0 0-1.06l-6.6-6.57Z" />
            </svg>
          </button>
        </div>
      </div>

      <p className="reviews__summary">{t.reviews.summary}</p>
    </section>
  );
}
