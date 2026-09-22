"use client";

import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import { useCopy } from "../LangProvider";
import { useBooking } from "../layout/BookingProvider";
import Icon from "../ui/Icon";
import TrustFacts from "../ui/TrustFacts";
import styles from "./Hero.module.css";

/**
 * Art-directed hero photo: the wide campaign shot on landscape screens and a
 * portrait crop of the same shot on tall ones, so phones get a sharp face
 * instead of an upscaled strip of the wide image. Both are covered to the
 * viewport, so `sizes` allows for the overscan.
 */
function HeroPicture({ alt }: { alt: string }) {
  const common = {
    alt,
    sizes: "(max-aspect-ratio: 4/5) 125vw, 115vw",
    loading: "eager",
    fetchPriority: "high",
  } as const;
  const { props: wide } = getImageProps({ ...common, src: "/images/hero-face.jpg", width: 2880, height: 1607 });
  const {
    props: { srcSet: tall },
  } = getImageProps({ ...common, src: "/images/hero-face-mobile.jpg", width: 1170, height: 2080 });

  return (
    <picture className={styles.picture}>
      <source media="(max-aspect-ratio: 4/5)" srcSet={tall} sizes={common.sizes} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes through getImageProps */}
      <img {...wide} />
    </picture>
  );
}

/** One span per letter for the staggered entrance, numbered on from `start`. */
function Letters({ text, start }: { text: string; start: number }) {
  return [...text].map((letter, i) => (
    <span key={i} className={styles.letter} style={{ "--i": start + i } as CSSProperties}>
      {letter}
    </span>
  ));
}

/**
 * The client's approved hero: a short promise, SG over LASERZENTRUM (stacked
 * on phones, one line on landscape screens), the line of copy, one booking
 * button and the four trust figures, anchored to the bottom of the photograph.
 */
export default function Hero() {
  const t = useCopy();
  const { openBooking } = useBooking();

  return (
    <section data-nav-overlay className={styles.hero} aria-labelledby="hero-title">
      <HeroPicture alt={t.hero.imageAlt} />
      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.content}>
        <p className={`rise ${styles.eyebrow}`} style={{ "--delay": "650ms" } as CSSProperties}>
          {t.hero.eyebrow}
        </p>

        <h1 id="hero-title" className={styles.lockup}>
          <span className="sr-only">{t.hero.heading}</span>
          <span className={styles.mark} aria-hidden="true">
            <Letters text={t.hero.mark} start={0} />
          </span>
          <span className={styles.word} aria-hidden="true">
            <Letters text={t.hero.word} start={t.hero.mark.length + 1} />
          </span>
        </h1>

        {/* stacked on phones; on landscape screens the copy at the left and the button at the right */}
        <div className={styles.row}>
          <p className={`rise ${styles.intro}`} style={{ "--delay": "850ms" } as CSSProperties}>
            {t.hero.intro}
          </p>
          <button type="button" className={`rise ${styles.cta}`} style={{ "--delay": "950ms" } as CSSProperties} onClick={openBooking}>
            {t.hero.cta}
            <Icon name="arrow" size={16} className={styles.ctaIcon} />
          </button>
        </div>

        <TrustFacts className={`rise ${styles.facts}`} style={{ "--delay": "1100ms" } as CSSProperties} />
      </div>
    </section>
  );
}
