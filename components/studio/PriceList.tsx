"use client";

import { useState } from "react";
import type { Studio } from "@/lib/locations";
import { SAMPLE_PRICES, formatPrice, pricesFor, type StudioPrices } from "@/lib/prices";
import { PUBLISHED_SERVICES, type ServiceId } from "@/lib/services";
import { useCopy } from "../LangProvider";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./PriceList.module.css";

function servicesWithPrices(prices: StudioPrices) {
  return PUBLISHED_SERVICES.filter((id) => (prices[id]?.length ?? 0) > 0);
}

export default function PriceList({ studio }: { studio: Studio }) {
  const t = useCopy();
  const real = pricesFor(studio.slug);
  const hasReal = servicesWithPrices(real).length > 0;
  // Until the studio's list arrives, development shows labelled sample data.
  const prices = hasReal ? real : process.env.NODE_ENV !== "production" ? SAMPLE_PRICES : {};
  const services = servicesWithPrices(prices);
  const [tab, setTab] = useState<ServiceId | undefined>(services[0]);
  const shown = tab && services.includes(tab) ? tab : services[0];

  return (
    <section id="preise" className={styles.section} aria-labelledby="prices-title">
      <header className={styles.head}>
        <Reveal>
          <p className="t-mono t-muted">{t.studio.pricesEyebrow}</p>
        </Reveal>
        <SplitWords as="h2" id="prices-title" text={t.studio.pricesTitle(studio.city)} className="t-h2" />
      </header>

      {!shown ? (
        <Reveal className={styles.empty}>
          <p className={`t-lead ${styles.emptyText}`}>{t.studio.pricesPending}</p>
          <div className={styles.actions}>
            <Button href={studio.phoneHref} variant="black">
              {t.studio.call}
            </Button>
            {studio.whatsapp && (
              <Button href={studio.whatsapp} external variant="white">
                {t.studio.whatsapp}
              </Button>
            )}
          </div>
        </Reveal>
      ) : (
        <Reveal className={styles.card}>
          {!hasReal && <p className={`t-mono ${styles.sample}`}>{t.studio.pricesSample}</p>}

          {services.length > 1 && (
            <div className={styles.tabs} role="tablist">
              {services.map((id) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  className={styles.tab}
                  aria-selected={id === shown}
                  onClick={() => setTab(id)}
                >
                  {t.services[id]}
                </button>
              ))}
            </div>
          )}

          <div className={styles.groups} role={services.length > 1 ? "tabpanel" : undefined}>
            {prices[shown]?.map((group) => (
              <div key={group.title} className={styles.group}>
                <h3 className={`t-mono ${styles.groupTitle}`}>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.name} className={styles.row}>
                      <span className={styles.name}>
                        {item.name}
                        {item.note && <span className={styles.note}>{item.note}</span>}
                      </span>
                      <span className={styles.price}>{formatPrice(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </section>
  );
}
