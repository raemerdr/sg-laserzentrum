"use client";

import { useId, useState } from "react";
import { useCopy } from "../LangProvider";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./Faq.module.css";

type Item = { q: string; a: string; list?: string[] };

function FaqItem({ item, defaultOpen }: { item: Item; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <li className={styles.item}>
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          className={styles.question}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={() => setOpen((v) => !v)}
        >
          {item.q}
          <span className={styles.icon} aria-hidden="true">
            <Icon name="plus" size={18} />
          </span>
        </button>
      </h3>
      <div id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} className={styles.panel} data-open={open} inert={!open}>
        <div className={styles.panelInner}>
          <div className={styles.answer}>
            <p>{item.a}</p>
            {item.list?.length ? (
              <ul>
                {item.list.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Faq() {
  const t = useCopy();
  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <header className={styles.head}>
        <Reveal>
          <p className="t-mono t-muted">{t.faq.eyebrow}</p>
        </Reveal>
        <SplitWords as="h2" id="faq-title" text={t.faq.title} className="t-h2" />
      </header>
      <Reveal>
        <ul className={styles.list}>
          {t.faq.items.map((item, i) => (
            <FaqItem key={item.q} item={item} defaultOpen={i === 0} />
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
