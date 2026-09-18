"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { scrollToElement, scrollToY } from "@/lib/scroll";

/**
 * Links to the current page scroll smoothly instead of navigating: "/#section"
 * to that section, a plain link to the page itself back to the top. Links to
 * other pages navigate normally.
 */
export function useHashLink() {
  const pathname = usePathname();

  return (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, hash] = href.split("#");
    if (path !== "" && path !== pathname) return false;
    const target = hash ? document.getElementById(hash) : null;
    if (hash && !target) return false;
    event.preventDefault();
    // Scroll a frame later: a click in the open menu closes it first, and the
    // smooth scroller ignores requests while the menu still holds the page.
    requestAnimationFrame(() => (target ? scrollToElement(target) : scrollToY(0)));
    window.history.replaceState(null, "", hash ? `#${hash}` : pathname);
    return true;
  };
}
