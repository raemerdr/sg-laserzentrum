"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sticks once its bottom edge reaches the bottom of the screen, so the
 * content that follows scrolls up over it. The offset is measured, so it
 * holds for any height the children end up with.
 */
export default function PinToBottom({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`;
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} style={{ position: "sticky" }}>
      {children}
    </div>
  );
}
