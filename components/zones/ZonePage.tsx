"use client";

import type { CSSProperties } from "react";
import { findZone, zoneImage, type ZoneSlug } from "@/lib/zones";
import { useCopy } from "../LangProvider";
import { useBooking } from "../layout/BookingProvider";
import BookingCta from "../sections/BookingCta";
import Faq from "../sections/Faq";
import StudioList from "../sections/StudioList";
import Button from "../ui/Button";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import ZoneLinks from "./ZoneLinks";
import styles from "./ZonePage.module.css";

/**
 * Landing page for one treatment zone: what it involves, how a treatment
 * runs, where to get it (links to every studio page), the other zones, FAQ
 * and booking.
 */
export default function ZonePage({ slug }: { slug: ZoneSlug }) {
  const t = useCopy();
  const { openBooking } = useBooking();
  const zone = findZone(slug);
  if (!zone) return null;
  const copy = t.zones.items[zone.slug];

  return (
    <>
      <section className={styles.hero} aria-labelledby="zone-title">
        <div className={styles.heroText}>
          <p className="t-mono t-muted rise">{t.zones.eyebrow}</p>
          <SplitWords as="h1" id="zone-title" mode="load" text={copy.title} className={styles.title} delay={80} />
          <p className={`t-lead rise ${styles.intro}`} style={{ "--delay": "450ms" } as CSSProperties}>
            {copy.intro}
          </p>
          <div className={`rise ${styles.actions}`} style={{ "--delay": "600ms" } as CSSProperties}>
            <Button onClick={openBooking} icon="arrow">
              {t.zones.book}
            </Button>
            <Button href="#standorte" variant="white">
              {t.zones.toStudios}
            </Button>
          </div>
        </div>
        <Reveal className={styles.heroMedia} delay={120}>
          <Photo
            src={zoneImage(zone)}
            alt={t.treatments.items[zone.treatment].alt}
            sizes="(max-width: 899px) 92vw, 600px"
            preload
          />
        </Reveal>
      </section>

      <section className={styles.facts} aria-label={t.zones.eyebrow}>
        <ul className={styles.factList}>
          {t.zones.facts.map((fact, i) => (
            <li key={fact.label}>
              <Reveal className={styles.fact} delay={i * 80}>
                <span className={styles.factValue}>{fact.value}</span>
                <span className={styles.factLabel}>{fact.label}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.steps} aria-labelledby="steps-title">
        <header className={styles.head}>
          <Reveal>
            <p className="t-mono t-muted">{t.zones.stepsEyebrow}</p>
          </Reveal>
          <SplitWords as="h2" id="steps-title" text={t.zones.stepsTitle} className="t-h2" />
        </header>
        <ol className={styles.stepList}>
          {t.zones.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal className={styles.step} delay={i * 90}>
                <span className={`t-mono ${styles.stepIndex}`}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal className={styles.note}>
          <p className="t-mono t-muted">{t.zones.noteTitle}</p>
          <p className={styles.noteBody}>{copy.note}</p>
        </Reveal>
      </section>

      <StudioList title={t.zones.studiosTitle(copy.name)} />
      <ZoneLinks title={t.zones.othersTitle} exclude={zone.slug} />
      <Faq />
      <BookingCta />
    </>
  );
}
