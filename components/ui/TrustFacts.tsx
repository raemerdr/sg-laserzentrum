"use client";

import type { CSSProperties } from "react";
import type { FactId } from "@/lib/content";
import { STUDIOS } from "@/lib/locations";
import { FACTS } from "@/lib/site";
import { useCopy } from "../LangProvider";
import Icon, { type IconName } from "./Icon";
import styles from "./TrustFacts.module.css";

const ICONS: Record<FactId, IconName> = {
  treatments: "users",
  reviews: "star",
  studios: "pin",
  nisv: "shield",
};

/**
 * The four trust figures with their icons, as on the home hero. Colours come
 * from the surrounding text, so the row works on dark and on light photos;
 * `className` places it.
 */
export default function TrustFacts({ className = "", style }: { className?: string; style?: CSSProperties }) {
  const t = useCopy();

  return (
    <ul className={`${styles.facts} ${className}`} aria-label={t.hero.factsLabel} style={style}>
      {t.hero.facts(STUDIOS.length, FACTS.treatments, FACTS.googleReviews).map((f) => (
        <li key={f.id} className={styles.fact}>
          <Icon name={ICONS[f.id]} size={24} className={styles.icon} />
          <span className={styles.text}>
            <span className={styles.value}>{f.value}</span> <span className={styles.label}>{f.label}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
