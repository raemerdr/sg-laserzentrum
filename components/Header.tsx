"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LOCATIONS } from "@/lib/content";
import { useCopy } from "./LangProvider";
import Wordmark from "./Wordmark";
import PillButton from "./PillButton";

export default function Header() {
  const t = useCopy();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  // solid background once the hero has started to pass under the bar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    const id = window.requestAnimationFrame(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(id);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = () => mq.matches && close();
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="nav" data-scrolled={scrolled}>
        <Link href="/" className="nav__brand" aria-label="SG Laserzentrum">
          <Wordmark />
        </Link>

        <nav className="nav__pill" aria-label="Hauptnavigation">
          {t.nav.map((l) =>
            l.href === "/standorte" ? (
              <div key={l.label} className="nav__item">
                <Link href={l.href} aria-haspopup="true">
                  {l.label}
                </Link>
                <div className="nav__menu">
                  <ul>
                    {LOCATIONS.map((loc) => (
                      <li key={loc.slug}>
                        <Link href={`/standorte/${loc.slug}`}>{loc.city}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link className="nav__menu-all" href="/standorte">
                    {t.locations.backLabel}
                  </Link>
                </div>
              </div>
            ) : (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ),
          )}
        </nav>

        <span className="nav__book">
          <PillButton href="/standorte" size="sm">
            {t.navCta}
          </PillButton>
        </span>

        <button
          type="button"
          className="nav__burger"
          aria-label={t.menuOpen}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div id="mobile-menu" className="drawer" data-open={open} aria-hidden={!open}>
        <div className="drawer__top">
          <Wordmark className="wordmark--drawer" />
          <button type="button" className="drawer__close" aria-label={t.menuClose} onClick={close}>
            ×
          </button>
        </div>
        <nav className="drawer__links" aria-label="Mobile Navigation">
          {t.nav.map((l) =>
            l.href === "/standorte" ? (
              <div key={l.label} className="drawer__group">
                <Link href={l.href} onClick={close} tabIndex={open ? 0 : -1}>
                  {l.label}
                </Link>
                <ul className="drawer__cities">
                  {LOCATIONS.map((loc) => (
                    <li key={loc.slug}>
                      <Link href={`/standorte/${loc.slug}`} onClick={close} tabIndex={open ? 0 : -1}>
                        {loc.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <a key={l.label} href={l.href} onClick={close} tabIndex={open ? 0 : -1}>
                {l.label}
              </a>
            ),
          )}
        </nav>
        <a href="#standorte" className="drawer__cta" onClick={close} tabIndex={open ? 0 : -1}>
          {t.navCta}
        </a>
      </div>
    </>
  );
}
