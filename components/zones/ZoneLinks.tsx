"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ZONES, zoneImage, zonePath, type ZoneSlug } from "@/lib/zones";
import { useCopy } from "../LangProvider";
import Icon from "../ui/Icon";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./ZoneLinks.module.css";

/** Cards linking to the treatment-zone pages, on studio pages and zone pages. */
export default function ZoneLinks({ title, intro, exclude }: { title: string; intro?: string; exclude?: ZoneSlug }) {
  const t = useCopy();
  const zones = ZONES.filter((z) => z.slug !== exclude);

  return (
    <section id="behandlungsbereiche" className={styles.section} aria-labelledby="zones-title">
      <header className={styles.head}>
        <Reveal>
          <p className="t-mono t-muted">{t.zones.listEyebrow}</p>
        </Reveal>
        <SplitWords as="h2" id="zones-title" text={title} className="t-h2" />
        {intro && (
          <Reveal delay={150}>
            <p className={styles.intro}>{intro}</p>
          </Reveal>
        )}
      </header>

      <ul className={styles.grid} style={{ "--count": zones.length } as CSSProperties}>
        {zones.map((zone, i) => (
          <li key={zone.slug}>
            <Reveal className={styles.cardWrap} delay={i * 90}>
              <Link href={zonePath(zone.slug)} className={styles.card}>
                <span className={styles.media}>
                  <Photo src={zoneImage(zone)} alt="" sizes="(max-width: 599px) 92vw, (max-width: 1099px) 46vw, 25vw" />
                </span>
                <span className={styles.name}>
                  {t.zones.items[zone.slug].name}
                  <Icon name="arrow" size={18} />
                </span>
                <span className={styles.text}>{t.treatments.items[zone.treatment].body}</span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
