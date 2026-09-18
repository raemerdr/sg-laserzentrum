import Link from "next/link";
import type { ReactNode } from "react";
import { INLINE_LINK } from "@/lib/articles";
import styles from "./Ratgeber.module.css";

/** Article text with its [label](/path) links turned into real links. */
export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE_LINK)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    parts.push(
      <Link key={index} href={match[2]} className={styles.inlineLink}>
        {match[1]}
      </Link>,
    );
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

/** A list item. A short lead-in before the first ": " is set in bold. */
export function Item({ text }: { text: string }) {
  const match = /^([^[\]]{2,40}?):\s(.+)$/.exec(text);
  if (!match) return <Inline text={text} />;
  return (
    <>
      <strong className={styles.itemLabel}>{match[1]}:</strong> <Inline text={match[2]} />
    </>
  );
}
