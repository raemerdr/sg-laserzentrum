"use client";

import { useCopy } from "../LangProvider";
import Button from "../ui/Button";
import PageHeader from "../ui/PageHeader";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const t = useCopy();
  return (
    <div className={styles.page}>
      <PageHeader eyebrow={t.notFound.eyebrow} title={t.notFound.title} intro={t.notFound.body}>
        <Button href="/" icon="arrow">
          {t.notFound.cta}
        </Button>
      </PageHeader>
    </div>
  );
}
