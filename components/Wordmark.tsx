"use client";

import { useCopy } from "./LangProvider";

/**
 * Interlocking SG monogram plus the clinic line.
 * The two letterforms are set in the display serif and overlapped, which
 * approximates the gold brand mark. Drop the real artwork into
 * public/images and swap this for an <Image> when it is available.
 */
export default function Wordmark({
  className = "",
  showLine = true,
}: {
  className?: string;
  showLine?: boolean;
}) {
  const t = useCopy();
  return (
    <span className={`wordmark ${className}`}>
      <span className="monogram" aria-hidden="true">
        <span className="monogram__s">S</span>
        <span className="monogram__g">G</span>
      </span>
      {showLine && <span className="wordmark__line">{t.brandLine}</span>}
    </span>
  );
}
