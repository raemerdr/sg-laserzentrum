import type Lenis from "lenis";

/** The Lenis instance lives here so any component can scroll or lock. */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export const NAV_OFFSET = 96;

/** `data-scroll-offset` on the target overrides the nav offset (px above the element). */
export function scrollToElement(el: HTMLElement) {
  const offset = el.dataset.scrollOffset ? Number(el.dataset.scrollOffset) : NAV_OFFSET;
  if (lenis) {
    lenis.scrollTo(el, { offset: -offset, duration: 1.4 });
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}

export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/**
 * Counted, because locks overlap: choosing "Termin buchen" in the mobile menu
 * closes the menu (one unlock) while the booking dialog opens (one lock).
 */
let locks = 0;

export function lockScroll(locked: boolean) {
  locks = Math.max(0, locks + (locked ? 1 : -1));
  const active = locks > 0;
  if (active) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = active ? "hidden" : "";
}
