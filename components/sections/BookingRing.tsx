"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { STUDIOS, findStudio, type StudioSlug } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./BookingRing.module.css";

const RING = [
  "/images/achseln.jpg",
  "/images/studio.jpg",
  "/images/gesicht.jpg",
  "/images/silk.jpg",
  "/images/beine.jpg",
  "/images/vorteil-2.jpg",
  "/images/portrait.jpg",
  "/images/laser.jpg",
  "/images/bikinizone.jpg",
  "/images/panel-textur.jpg",
  "/images/hero.jpg",
  "/images/vorteil-3.jpg",
  "/images/hero-chair.jpg",
  "/images/vorteil-1.jpg",
  "/images/bikinizone.jpg",
  "/images/laser.jpg",
];

export default function BookingRing({ studio }: { studio?: StudioSlug }) {
  const t = useCopy();
  const [slug, setSlug] = useState<string>(studio ?? "");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const target = findStudio(slug);
    if (target) window.open(target.booking, "_blank", "noopener,noreferrer");
  };

  return (
    <section className={styles.section} aria-labelledby="ring-title">
      <div className={styles.ring} aria-hidden="true" style={{ "--n": RING.length } as CSSProperties}>
        {RING.map((src, i) => (
          <div key={i} className={styles.card} style={{ "--i": i } as CSSProperties}>
            <Photo src={src} alt="" sizes="220px" />
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <SplitWords as="h2" id="ring-title" text={t.booking.title} className="t-h2" />
        <Reveal delay={200}>
          <p className={styles.body}>{t.booking.body}</p>
        </Reveal>
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.selectWrap}>
            <label htmlFor="ring-studio" className="sr-only">
              {t.booking.select}
            </label>
            <select
              id="ring-studio"
              className={styles.select}
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            >
              <option value="" disabled>
                {t.booking.select}
              </option>
              {STUDIOS.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.city}
                </option>
              ))}
            </select>
            <span className={styles.chevron} aria-hidden="true" />
          </div>
          <button type="submit" className={styles.submit}>
            {t.booking.submit}
            <span className="sr-only"> {t.a11y.opensNewTab}</span>
          </button>
        </form>
      </div>
    </section>
  );
}
