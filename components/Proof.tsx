"use client";

import ImageSlot from "./ImageSlot";
import { useCopy } from "./LangProvider";

export default function Proof() {
  const t = useCopy();
  return (
    <section id="ergebnisse" className="proof">
      <div className="proof__grid">
        <div className="proof__tile proof__tile--portrait">
          <div className="proof__media">
            <ImageSlot id="proof1" label={t.proof.portraitAlt} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="proof__glass">
            <span className="proof__glass-title">{t.proof.label}</span>
            <div className="proof__glass-body">
              <span className="proof__stat">{t.proof.stat}</span>
              <span className="body-light">{t.proof.body}</span>
            </div>
          </div>
        </div>
        <div className="proof__tile proof__tile--product">
          <div className="proof__media proof__media--inset">
            <ImageSlot id="proof2" label={t.proof.techAlt} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          {t.proof.notes.map((n, i) => (
            <span key={n} className={`proof__note proof__note--${i + 1}`}>
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
