"use client";

import { useRef, useState, type FormEvent } from "react";
import { STUDIOS, findStudio, type StudioSlug } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import Listbox, { type ListboxHandle } from "../ui/Listbox";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./BookingCta.module.css";

export default function BookingCta({ studio }: { studio?: StudioSlug }) {
  const t = useCopy();
  const [slug, setSlug] = useState<string>(studio ?? "");
  const picker = useRef<ListboxHandle>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const target = findStudio(slug);
    // no studio chosen yet: open the list instead of doing nothing
    if (!target) return picker.current?.open();
    window.open(target.booking, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="termin" className={styles.section} aria-labelledby="booking-cta-title" data-scroll-offset="0">
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.drift}>
          <Photo src="/images/booking-bg.jpg" alt="" sizes="100vw" position="50% 40%" />
        </div>
      </div>

      <div className={styles.content}>
        <SplitWords as="h2" id="booking-cta-title" text={t.booking.title} className="t-h2" />
        <Reveal delay={200}>
          <p className={styles.body}>{t.booking.body}</p>
        </Reveal>
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.selectWrap}>
            {/* prefers opening upwards into the photo; below the form the footer's curve begins */}
            <Listbox
              ref={picker}
              id="booking-cta-studio"
              label={t.booking.select}
              placeholder={t.booking.select}
              options={STUDIOS.map((s) => ({ value: s.slug, label: s.city, hint: `${s.street}, ${s.zip}` }))}
              value={slug}
              onChange={setSlug}
              placement="top"
            />
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
