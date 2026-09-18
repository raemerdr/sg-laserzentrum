"use client";

import { STUDIOS } from "@/lib/locations";
import { scrollToElement } from "@/lib/scroll";
import { useCopy } from "../LangProvider";
import { useBooking } from "../layout/BookingProvider";
import Button from "../ui/Button";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./About.module.css";

export default function About() {
  const t = useCopy();
  const { openBooking } = useBooking();

  // slide down to the studio picker at the end of the page
  const toBooking = () => {
    const section = document.getElementById("termin");
    if (!section) {
      openBooking();
      return;
    }
    scrollToElement(section);
    document.getElementById("booking-cta-studio")?.focus({ preventScroll: true });
  };

  return (
    <section className={styles.about} aria-labelledby="about-title">
      <div className={styles.media}>
        <Photo src="/images/studio.jpg" alt={t.about.imageAlt} sizes="100vw" position="50% 60%" />
      </div>
      <div className={styles.veil} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.titleCol}>
          <Reveal>
            <p className={`t-mono ${styles.eyebrow}`}>{t.about.eyebrow}</p>
          </Reveal>
          <SplitWords as="h2" id="about-title" text={t.about.title} className="t-h2" />
        </div>
        <Reveal className={styles.text} delay={250}>
          <p className="t-lead">{t.about.body(STUDIOS.length)}</p>
        </Reveal>
        <Reveal className={styles.action} delay={400}>
          <Button onClick={toBooking}>{t.nav.book}</Button>
        </Reveal>
      </div>
    </section>
  );
}
