"use client";

import { useState, type FormEvent } from "react";
import { STUDIOS, findStudio, type StudioSlug } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./BookingCta.module.css";

export default function BookingCta({ studio }: { studio?: StudioSlug }) {
  const t = useCopy();
  const [slug, setSlug] = useState<string>(studio ?? "");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const target = findStudio(slug);
    if (target) window.open(target.booking, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="termin" className={styles.section} aria-labelledby="booking-cta-title" data-scroll-offset="0">
      <div className={styles.backdrop} aria-hidden="true">
        <Photo src="/images/booking-bg.jpg" alt="" sizes="100vw" position="50% 40%" />
      </div>

      <div className={styles.content}>
        <SplitWords as="h2" id="booking-cta-title" text={t.booking.title} className="t-h2" />
        <Reveal delay={200}>
          <p className={styles.body}>{t.booking.body}</p>
        </Reveal>
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.selectWrap}>
            <label htmlFor="booking-cta-studio" className="sr-only">
              {t.booking.select}
            </label>
            <select
              id="booking-cta-studio"
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
