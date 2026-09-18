"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { PUBLISHED_TREATMENTS } from "@/lib/services";
import { scrollToY } from "@/lib/scroll";
import { useCopy } from "../LangProvider";
import Button from "../ui/Button";
import Photo from "../ui/Photo";
import styles from "./Treatments.module.css";

/** How far the card sits in the deck: gone (flown up), active, behind, hidden. */
function cardState(offset: number) {
  if (offset < 0) return "gone";
  if (offset === 0) return "active";
  return offset <= 3 ? "behind" : "hidden";
}

export default function Treatments() {
  const t = useCopy();
  const items = PUBLISHED_TREATMENTS;
  const stageRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const stepSize = () => {
    const stage = stageRef.current;
    const sticky = stickyRef.current;
    if (!stage || !sticky || items.length < 2) return 0;
    return (stage.offsetHeight - sticky.offsetHeight) / (items.length - 1);
  };

  // The active treatment follows scroll: it switches halfway through each step.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const stage = stageRef.current;
      const step = stepSize();
      if (!stage || !step) return;
      const progress = -stage.getBoundingClientRect().top / step;
      setActive(Math.min(items.length - 1, Math.max(0, Math.round(progress))));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
    // stepSize reads refs only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const goTo = (index: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    const top = stage.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + index * stepSize() + 1);
  };

  const current = items[active];
  const copy = t.treatments.items[current.id];

  return (
    <section id="behandlungen" className={styles.section} aria-labelledby="treatments-title">
      <h2 id="treatments-title" className="sr-only">
        {t.nav.treatments}
      </h2>

      <div ref={stageRef} className={styles.stage} style={{ "--count": items.length } as CSSProperties}>
        <div ref={stickyRef} className={styles.sticky}>
          <ul className={styles.list} aria-label={t.treatments.listLabel}>
            {items.map((item, i) => (
              <li key={item.id}>
                <button type="button" className={styles.item} aria-pressed={i === active} onClick={() => goTo(i)}>
                  {t.treatments.items[item.id].name}
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.deck}>
            {items.map((item, i) => (
              <div
                key={item.id}
                className={styles.card}
                data-state={cardState(i - active)}
                data-depth={i - active}
                style={{ "--d": Math.max(i - active, 0), zIndex: items.length - i } as CSSProperties}
                aria-hidden={i !== active}
              >
                <Photo
                  src={item.image}
                  alt={t.treatments.items[item.id].alt}
                  sizes="(max-width: 999px) 92vw, 520px"
                />
              </div>
            ))}
          </div>

          <div className={styles.desc}>
            <p key={`service-${current.id}`} className={`t-mono ${styles.service} ${styles.swap}`}>
              {t.services[current.service]}
            </p>
            <p key={`body-${current.id}`} className={styles.swap}>
              {copy.body}
            </p>
            <Button href="/standorte" icon="arrow" className={styles.cta}>
              {t.treatments.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
