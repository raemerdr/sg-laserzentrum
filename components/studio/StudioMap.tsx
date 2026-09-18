"use client";

import { mapsEmbedUrl, type Studio } from "@/lib/locations";
import { useLang } from "../LangProvider";
import Reveal from "../ui/Reveal";
import styles from "./StudioMap.module.css";

/** Google Maps for the studio, loaded as it nears the viewport. */
export default function StudioMap({ studio, className = "" }: { studio: Studio; className?: string }) {
  const { lang, t } = useLang();

  return (
    <Reveal className={`${styles.frame} ${className}`}>
      <iframe
        className={styles.map}
        src={mapsEmbedUrl(studio, lang)}
        title={t.studio.map.title(studio.city)}
        loading="lazy"
        allowFullScreen
      />
    </Reveal>
  );
}
