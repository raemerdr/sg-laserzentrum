"use client";

import { ARTICLES } from "@/lib/articles";
import { useCopy } from "../LangProvider";
import PageHeader from "../ui/PageHeader";
import Reveal from "../ui/Reveal";
import ArticleCard from "./ArticleCard";
import styles from "./Ratgeber.module.css";

/** Ratgeber overview: the page header and a card for every article. */
export default function ArticleList() {
  const t = useCopy();
  return (
    <div>
      <PageHeader eyebrow={t.ratgeber.eyebrow} title={t.ratgeber.title} intro={t.ratgeber.intro} />
      <section className={styles.listSection} aria-label={t.ratgeber.eyebrow}>
        <ul className={styles.cards}>
          {ARTICLES.map((article, i) => (
            <li key={article.slug}>
              <Reveal className={styles.cardWrap} delay={(i % 3) * 90}>
                <ArticleCard slug={article.slug} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
