"use client";

import { getImageProps } from "next/image";
import { STUDIOS } from "@/lib/locations";
import { scrollToElement } from "@/lib/scroll";
import { useCopy } from "../LangProvider";
import { useBooking } from "../layout/BookingProvider";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./About.module.css";

/**
 * The studio photograph, art-directed: the wide shot on landscape screens and
 * a tall version of the same room on portrait ones, so phones get a sharp
 * room instead of a blown-up slice of the wide image.
 */
function AboutPicture({ alt }: { alt: string }) {
  const common = { alt, sizes: "100vw" } as const;
  const { props: wide } = getImageProps({ ...common, src: "/images/studio.jpg", width: 2400, height: 1018 });
  const {
    props: { srcSet: tall },
  } = getImageProps({ ...common, src: "/images/studio-mobile.jpg", width: 1170, height: 2096 });

  return (
    <picture className={styles.picture}>
      <source media="(max-aspect-ratio: 4/5)" srcSet={tall} sizes={common.sizes} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes through getImageProps */}
      <img {...wide} />
    </picture>
  );
}

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
        <AboutPicture alt={t.about.imageAlt} />
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
