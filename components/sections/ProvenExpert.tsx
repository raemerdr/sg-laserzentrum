"use client";

import { PROVEN_EXPERT } from "@/lib/site";
import { useCopy } from "../LangProvider";
import styles from "./ProvenExpert.module.css";

/**
 * ProvenExpert seal linking to the profile. The seal image is served by
 * ProvenExpert, so the privacy policy has to mention it before it goes live.
 */
export default function ProvenExpert() {
  const t = useCopy();
  const { profileUrl, sealImageUrl } = PROVEN_EXPERT;

  if (profileUrl && sealImageUrl) {
    return (
      <a className={styles.seal} href={profileUrl} target="_blank" rel="noopener noreferrer">
        {/* external seal with vendor-defined size, so next/image is not used */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sealImageUrl} alt={t.reviews.provenExpert.label} loading="lazy" />
        <span className={styles.link}>{t.reviews.provenExpert.link}</span>
        <span className="sr-only">{t.a11y.opensNewTab}</span>
      </a>
    );
  }

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className={styles.devSlot}>
      <span className="t-mono">{t.reviews.provenExpert.label}</span>
      <p>{t.reviews.provenExpert.devSlot}</p>
    </div>
  );
}
