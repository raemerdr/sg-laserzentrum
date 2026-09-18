"use client";

import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import { STUDIOS } from "@/lib/locations";
import { useCopy } from "../LangProvider";
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

export default function Hero() {
  const t = useCopy();

  return (
    <section data-nav-overlay className={styles.hero} aria-labelledby="hero-title">
      <HeroPicture alt={t.hero.imageAlt} />
      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.content}>
        <p className={`rise ${styles.intro}`} style={{ "--delay": "750ms" } as CSSProperties}>
          {t.hero.intro}
        </p>

        <h1 id="hero-title" className={styles.word}>
          <span className="sr-only">{t.hero.heading}</span>
          <span aria-hidden="true">
            {[...t.hero.word].map((letter, i) => (
              <span key={i} className={styles.letter} style={{ "--i": i } as CSSProperties}>
                {letter}
              </span>
            ))}
          </span>
        </h1>

        <ul className={`rise ${styles.labels}`} style={{ "--delay": "950ms" } as CSSProperties}>
          {t.hero.labels(STUDIOS.length).map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
