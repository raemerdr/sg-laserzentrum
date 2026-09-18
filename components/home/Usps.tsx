"use client";

import { STUDIOS } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import styles from "./Usps.module.css";

/** Full-width strip of tall photo tiles below the About photograph; the paper panel's curve rises over it. */
export default function Usps() {
  const t = useCopy();

  return (
    <section className={styles.section} aria-labelledby="usps-title">
      <h2 id="usps-title" className="sr-only">
        {t.proof.eyebrow}
      </h2>

      <ul className={styles.grid}>
        {t.proof.usps(STUDIOS.length).map((u, i) => (
          <li key={u.title}>
            <Reveal className={styles.card} delay={(i % 3) * 90}>
              <Photo
                src={u.photo.src}
                alt={u.photo.alt}
                sizes="(max-width: 599px) 50vw, (max-width: 1199px) 34vw, 17vw"
                position={u.photo.position}
                className={styles.photo}
              />
              <h3 className={styles.title}>{u.title}</h3>
              <p className={styles.body}>{u.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
