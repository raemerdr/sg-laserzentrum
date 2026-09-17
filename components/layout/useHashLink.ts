"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { scrollToElement } from "@/lib/scroll";

/**
 * "/#section" links scroll smoothly when that section is on the current
 * page, and navigate normally otherwise.
 */
export function useHashLink() {
  const pathname = usePathname();

  return (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, hash] = href.split("#");
    if (!hash || (path !== "" && path !== pathname)) return false;
    const target = document.getElementById(hash);
    if (!target) return false;
    event.preventDefault();
    scrollToElement(target);
    window.history.replaceState(null, "", `#${hash}`);
    return true;
  };
}
