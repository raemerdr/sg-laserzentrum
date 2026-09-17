"use client";

import { useCopy } from "../LangProvider";

export default function SkipLink() {
  const t = useCopy();
  return (
    <a href="#inhalt" className="skip-link">
      {t.a11y.skip}
    </a>
  );
}
