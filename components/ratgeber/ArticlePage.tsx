"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ARTICLES,
  ARTICLE_COPY,
  findArticle,
  headingId,
  readingMinutes,
  type ArticleBlock,
  type ArticleSlug,
} from "@/lib/articles";
import { STUDIOS } from "@/lib/locations";
import { useLang } from "../LangProvider";
import { useBooking } from "../layout/BookingProvider";
import { useHashLink } from "../layout/useHashLink";
import Button from "../ui/Button";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import ArticleCard from "./ArticleCard";
import { Inline, Item } from "./Inline";
import styles from "./Ratgeber.module.css";

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 id={headingId(block.text)}>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "p":
      return (
        <p>
          <Inline text={block.text} />
        </p>
      );
    case "list":
    case "steps": {
      const List = block.type === "steps" ? "ol" : "ul";
      return (
        <List className={block.type === "steps" ? styles.steps : undefined}>
          {block.items.map((item) => (
            <li key={item}>
              <Item text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "table":
      return (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="t-mono t-muted">{block.caption}</caption>
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} scope="col">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={i}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note":
      return (
        <aside className={styles.note}>
          <p className="t-mono t-muted">{block.title}</p>
          <p>
            <Inline text={block.text} />
          </p>
        </aside>
      );
  }
}

/**
 * One Ratgeber article: breadcrumbs, title, photo, a short answer to the
 * title's question, contents, the text, common questions, a booking box with
 * every studio, and further reading.
 */
export default function ArticlePage({ slug }: { slug: ArticleSlug }) {
  const { lang, t } = useLang();
  const { openBooking } = useBooking();
  const onHashLink = useHashLink();
  const article = findArticle(slug);
  if (!article) return null;
  const copy = ARTICLE_COPY[lang][slug];
  // date-only ISO string: format in UTC so no time zone shifts the day
  const date = new Intl.DateTimeFormat(t.ratgeber.dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(article.published));
  const sections = [...copy.blocks.flatMap((b) => (b.type === "h2" ? [b.text] : [])), t.ratgeber.faqTitle];
  const faqId = headingId(t.ratgeber.faqTitle);
  const more = ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <article className={styles.article}>
        <header className={styles.head}>
          <nav aria-label={t.ratgeber.crumbLabel} className={`t-mono rise ${styles.crumbs}`}>
            <ol>
              <li>
                <Link href="/">{t.ratgeber.home}</Link>
              </li>
              <li>
                <Link href="/ratgeber">{t.ratgeber.eyebrow}</Link>
              </li>
              <li aria-current="page">{copy.crumb}</li>
            </ol>
          </nav>
          <SplitWords as="h1" mode="load" text={copy.title} className={styles.title} delay={80} />
          <p className={`t-mono t-muted rise ${styles.meta}`} style={{ "--delay": "450ms" } as CSSProperties}>
            <time dateTime={article.published}>{date}</time> · {t.ratgeber.minutes(readingMinutes(copy))}
          </p>
        </header>

        <Reveal className={styles.hero}>
          <Photo src={article.image} alt={copy.imageAlt} sizes="(max-width: 999px) 92vw, 760px" preload />
        </Reveal>

        <p className={styles.intro}>{copy.intro}</p>

        <aside className={styles.answer} aria-labelledby="answer-title">
          <p id="answer-title" className="t-mono t-muted">
            {t.ratgeber.answer}
          </p>
          <p>{copy.answer}</p>
        </aside>

        <nav className={styles.toc} aria-labelledby="toc-title">
          <p id="toc-title" className="t-mono t-muted">
            {t.ratgeber.toc}
          </p>
          <ol>
            {sections.map((text, i) => {
              const id = headingId(text);
              return (
                <li key={id}>
                  <a href={`#${id}`} onClick={(e) => onHashLink(e, `#${id}`)}>
                    <span className="t-mono t-muted">{String(i + 1).padStart(2, "0")}</span>
                    {text}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className={styles.body}>
          {copy.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <section className={`${styles.body} ${styles.faq}`} aria-labelledby={faqId}>
          <h2 id={faqId}>{t.ratgeber.faqTitle}</h2>
          {copy.faq.map((item) => (
            <div key={item.q} className={styles.faqItem}>
              <h3>{item.q}</h3>
              <p>
                <Inline text={item.a} />
              </p>
            </div>
          ))}
        </section>

        <p className={styles.disclaimer}>{t.ratgeber.disclaimer}</p>

        <aside className={styles.cta} aria-labelledby="cta-title">
          <h2 id="cta-title" className={styles.ctaTitle}>
            {t.ratgeber.ctaTitle}
          </h2>
          <p className={styles.ctaBody}>{t.ratgeber.ctaBody}</p>
          <div className={styles.ctaActions}>
            <Button onClick={openBooking} icon="arrow">
              {t.nav.book}
            </Button>
            <Button href="/standorte" variant="white">
              {t.ratgeber.ctaStudios}
            </Button>
          </div>
          <div className={styles.cities}>
            <p className="t-mono t-muted">{t.ratgeber.nearYou}</p>
            <ul>
              {STUDIOS.map((studio) => (
                <li key={studio.slug}>
                  <Link href={`/standorte/${studio.slug}`} className={styles.city}>
                    {studio.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </article>

      <section className={styles.moreSection} aria-labelledby="more-title">
        <SplitWords as="h2" id="more-title" text={t.ratgeber.moreTitle} className="t-h2" />
        <ul className={styles.cards}>
          {more.map((a, i) => (
            <li key={a.slug}>
              <Reveal className={styles.cardWrap} delay={i * 90}>
                <ArticleCard slug={a.slug} heading="h3" />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
