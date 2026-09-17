"use client";

import type { CSSProperties, ReactNode } from "react";
import SplitWords from "./SplitWords";
import styles from "./PageHeader.module.css";

export default function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <header className={styles.header}>
      <p className="t-mono t-muted rise">{eyebrow}</p>
      <SplitWords as="h1" mode="load" text={title} className="t-display" delay={80} />
      {intro && (
        <p className={`t-lead rise ${styles.intro}`} style={{ "--delay": "450ms" } as CSSProperties}>
          {intro}
        </p>
      )}
      {children}
    </header>
  );
}
