"use client";

import type { CSSProperties } from "react";
import type { Studio } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import Button from "../ui/Button";
import Photo from "../ui/Photo";
import SplitWords from "../ui/SplitWords";
import styles from "./StudioHero.module.css";

export default function StudioHero({ studio }: { studio: Studio }) {
  const t = useCopy();
  return (
    <section data-nav-overlay className={styles.hero} aria-labelledby="studio-title">
      <div className={styles.media}>
        {/* the photo sits behind the headline, so it is decorative */}
        <Photo src={studio.image} alt="" sizes="100vw" preload />
      </div>
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.center}>
        <p className={`t-mono rise ${styles.eyebrow}`}>
          {t.studio.eyebrow} · {studio.city}
        </p>
        <SplitWords as="h1" id="studio-title" mode="load" text={t.studio.title(studio.city)} className="t-display" delay={80} />
        <p className={`t-lead rise ${styles.address}`} style={{ "--delay": "450ms" } as CSSProperties}>
          {studio.street}, {studio.zip}
        </p>
        <div className={`rise ${styles.actions}`} style={{ "--delay": "600ms" } as CSSProperties}>
          <Button href={studio.booking} external variant="paper" size="lg" icon="external">
            {t.studio.book}
          </Button>
          <Button href={studio.phoneHref} variant="glass" size="lg">
            {t.studio.call}
          </Button>
          {studio.whatsapp && (
            <Button href={studio.whatsapp} external variant="glass" size="lg">
              {t.studio.whatsapp}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
