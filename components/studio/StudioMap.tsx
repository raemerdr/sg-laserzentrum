"use client";

import { mapsEmbedUrl, type Studio } from "@/lib/locations";
import { useLang } from "../LangProvider";
import Reveal from "../ui/Reveal";
import styles from "./StudioMap.module.css";

/** Google Maps for the studio, loaded as it nears the viewport. */
export default function StudioMap({ studio }: { studio: Studio }) {
  const { lang, t } = useLang();

  return (
    <section className={styles.section} aria-label={t.studio.map.label}>
      <Reveal className={styles.frame}>
        <iframe
          className={styles.map}
          src={mapsEmbedUrl(studio, lang)}
          title={t.studio.map.title(studio.city)}
          loading="lazy"
          allowFullScreen
        />
      </Reveal>
    </section>
  );
}
