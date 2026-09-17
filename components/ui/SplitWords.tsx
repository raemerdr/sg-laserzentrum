"use client";

import type { CSSProperties } from "react";
import { useInView } from "./useInView";

type Tag = "h1" | "h2" | "h3" | "p";

/**
 * Word-by-word entrance, as on the reference headlines.
 * `load` animates on mount (and waits for the home intro); `view` waits
 * until the text scrolls into view.
 */
export default function SplitWords({
  text,
  as: Tag = "h2",
  mode = "view",
  className = "",
  delay = 0,
  id,
}: {
  text: string;
  as?: Tag;
  mode?: "load" | "view";
  className?: string;
  delay?: number;
  id?: string;
}) {
  const [ref, inView] = useInView<HTMLHeadingElement>();
  const words = text.split(" ");

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-words={mode}
      data-in={mode === "view" ? inView : undefined}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {words.map((word, i) => (
        <span key={i}>
          <span className="word" style={{ "--i": i } as CSSProperties}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
