"use client";

import Link from "next/link";
import { ARTICLE_COPY, findArticle, readingMinutes, type ArticleSlug } from "@/lib/articles";
import { useLang } from "../LangProvider";
import Icon from "../ui/Icon";
import Photo from "../ui/Photo";
import styles from "./Ratgeber.module.css";

/** Photo card linking to one article, on the overview and under each article. */
export default function ArticleCard({ slug, heading: Heading = "h2" }: { slug: ArticleSlug; heading?: "h2" | "h3" }) {
  const { lang, t } = useLang();
  const article = findArticle(slug);
  if (!article) return null;
  const copy = ARTICLE_COPY[lang][slug];

  return (
    <Link href={`/ratgeber/${slug}`} className={styles.card}>
      <span className={styles.media}>
        <Photo src={article.image} alt="" sizes="(max-width: 649px) 92vw, (max-width: 999px) 46vw, 30vw" />
      </span>
      <span className={`t-mono ${styles.cardMeta}`}>{t.ratgeber.minutes(readingMinutes(copy))}</span>
      <Heading className={styles.cardTitle}>{copy.title}</Heading>
      <span className={styles.excerpt}>{copy.excerpt}</span>
      <span className={styles.more}>
        {t.ratgeber.readMore}
        <Icon name="arrow" size={16} />
      </span>
    </Link>
  );
}
