"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/scroll";
import { INTRO_EVENT } from "./IntroOverlay";

/** Lenis smooth scrolling, as on the reference. Off for reduced motion. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, stopInertiaOnNavigate: true });
    setLenis(lenis);

    // hold the page still while the home intro plays
    const root = document.documentElement;
    const release = () => lenis.start();
    if (root.dataset.intro === "play") {
      lenis.stop();
      window.addEventListener(INTRO_EVENT, release, { once: true });
    }

    return () => {
      window.removeEventListener(INTRO_EVENT, release);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
