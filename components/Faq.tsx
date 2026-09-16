"use client";

import { useCopy } from "./LangProvider";

export default function Faq() {
  const t = useCopy();
  return (
    <section id="faq" className="faq">
      <div className="faq__head">
        <span className="eyebrow eyebrow--dark">{t.faq.label}</span>
        <h2 className="h-display">{t.faq.title}</h2>
      </div>

      <div className="faq__list">
        {t.faq.items.map((item) => (
          <details key={item.q} className="qa" name="faq">
            <summary>
              <span>{item.q}</span>
              <span className="qa__mark" aria-hidden="true" />
            </summary>
            <div className="qa__answer">
              <p>{item.a}</p>
              {item.list.length > 0 && (
                <ul>
                  {item.list.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
