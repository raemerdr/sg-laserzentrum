"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type FocusEvent, type MouseEvent, type PointerEvent } from "react";
import { CONTACT } from "@/lib/site";
import { PLANNED_CITIES, STUDIOS, findStudio } from "@/lib/locations";
import { PUBLISHED_SERVICES } from "@/lib/services";
import { lockScroll } from "@/lib/scroll";
import { useCopy } from "../LangProvider";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import SgMonogram from "../ui/SgMonogram";
import { useBooking } from "./BookingProvider";
import { useHashLink } from "./useHashLink";
import styles from "./Nav.module.css";

type Dropdown = "treatments" | "studios";

type HeroTone = "dark" | "light";

/**
 * The tone of the hero directly under the bar, from its `data-nav-overlay`
 * ("light" for bright photography, anything else dark), or null when no
 * hero is there. Hit testing (rather than scroll position) respects the
 * sticky stacks: the bar turns solid as the paper panel slides under it.
 */
function heroUnder(bar: HTMLElement): HeroTone | null {
  const hits = document.elementsFromPoint(window.innerWidth / 2, bar.offsetHeight / 2);
  for (const el of hits) {
    if (bar.contains(el) || !el.closest("main")) continue;
    const hero = el.closest<HTMLElement>("[data-nav-overlay]");
    if (!hero) return null;
    return hero.dataset.navOverlay === "light" ? "light" : "dark";
  }
  return null;
}

function Chevron() {
  return (
    <svg className={styles.chevron} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" focusable="false">
      <path d="m1.5 3.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Nav() {
  const t = useCopy();
  const pathname = usePathname();
  const onHashLink = useHashLink();
  const { openBooking } = useBooking();
  const [dropdown, setDropdown] = useState<Dropdown | null>(null);
  const [open, setOpen] = useState(false);
  // pages that open on a photograph start with a clear bar in the photo's tone
  const [overHero, setOverHero] = useState<HeroTone | null>(() =>
    pathname === "/" ? "dark" : pathname.startsWith("/standorte/") ? "light" : null,
  );
  const barRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const studio = pathname.startsWith("/standorte/") ? findStudio(pathname.split("/")[2] ?? "") : undefined;
  const treatmentLinks = [
    ...t.nav.treatmentLinks.slice(0, 1),
    // further published services (Aquafacial once it launches) sit in the same stage
    ...PUBLISHED_SERVICES.filter((id) => id !== "laser").map((id) => ({ label: t.services[id], href: "/#behandlungen" })),
    ...t.nav.treatmentLinks.slice(1),
  ];

  // Clear bar while hero photography sits under it, solid cream everywhere else.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (barRef.current) setOverHero(heroUnder(barRef.current));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  // Dropdowns close on Escape and on any click outside the bar.
  useEffect(() => {
    if (!dropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdown(null);
    };
    const onDown = (e: globalThis.PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setDropdown(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [dropdown]);

  // Full menu: lock the page, focus the first link, close on Escape.
  useEffect(() => {
    if (!open) return;
    const menuButton = menuBtnRef.current;
    lockScroll(true);
    sheetRef.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
      menuButton?.focus({ preventScroll: true });
    };
  }, [open]);

  const closeAll = () => {
    setDropdown(null);
    setOpen(false);
  };

  const follow = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    closeAll();
    onHashLink(e, href);
  };

  const hoverProps = (name: Dropdown) => ({
    onPointerEnter: (e: PointerEvent) => e.pointerType === "mouse" && setDropdown(name),
    onPointerLeave: (e: PointerEvent) => e.pointerType === "mouse" && setDropdown((d) => (d === name ? null : d)),
    onBlur: (e: FocusEvent<HTMLLIElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDropdown((d) => (d === name ? null : d));
    },
  });

  const bookLabel = (
    <>
      <span className={styles.long}>{t.nav.book}</span>
      <span className={styles.short}>{t.nav.bookShort}</span>
    </>
  );

  return (
    <>
      <header ref={barRef} className={styles.bar} data-transparent={!open && dropdown === null ? (overHero ?? undefined) : undefined}>
        <div className={styles.inner}>
          <Link href="/" className={styles.brand} aria-label={t.nav.home} onClick={(e) => follow(e, "/")}>
            <SgMonogram className={styles.logo} />
          </Link>

          <nav className={styles.center} aria-label={t.a11y.mainNav}>
            <ul className={styles.links}>
              <li className={styles.item} data-open={dropdown === "treatments"} {...hoverProps("treatments")}>
                <button
                  type="button"
                  className={`${styles.link} ${styles.caps}`}
                  aria-expanded={dropdown === "treatments"}
                  aria-controls="nav-treatments"
                  onClick={() => setDropdown((d) => (d === "treatments" ? null : "treatments"))}
                >
                  {t.nav.treatments}
                  <Chevron />
                </button>
                <ul id="nav-treatments" className={styles.dropdown}>
                  {treatmentLinks.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className={styles.dropLink} onClick={(e) => follow(e, l.href)}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className={styles.item} data-open={dropdown === "studios"} {...hoverProps("studios")}>
                <button
                  type="button"
                  className={`${styles.link} ${styles.caps}`}
                  aria-expanded={dropdown === "studios"}
                  aria-controls="nav-studios"
                  onClick={() => setDropdown((d) => (d === "studios" ? null : "studios"))}
                >
                  {t.nav.studios}
                  <Chevron />
                </button>
                <div id="nav-studios" className={styles.dropdown}>
                  <ul className={styles.studios}>
                    {STUDIOS.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/standorte/${s.slug}`} className={styles.dropLink} onClick={(e) => follow(e, `/standorte/${s.slug}`)}>
                          {s.city}
                          <span className={styles.dropMeta}>{s.zip.split(" ")[0]}</span>
                        </Link>
                      </li>
                    ))}
                    {PLANNED_CITIES.map((city) => (
                      <li key={city} className={`${styles.dropLink} ${styles.dropMuted}`}>
                        {city}
                        <span className={styles.dropMeta}>{t.nav.planned}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/standorte" className={`${styles.dropFoot} ${styles.caps}`} onClick={(e) => follow(e, "/standorte")}>
                    {t.nav.allStudios}
                    <Icon name="arrow" size={14} />
                  </Link>
                </div>
              </li>

              {t.nav.links.map((l) => (
                <li key={l.href} className={styles.item}>
                  <Link href={l.href} className={`${styles.link} ${styles.caps}`} onClick={(e) => follow(e, l.href)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            {studio ? (
              <a className={`${styles.action} ${styles.caps}`} href={studio.booking} target="_blank" rel="noopener noreferrer">
                {bookLabel}
                <span className="sr-only">{t.a11y.opensNewTab}</span>
              </a>
            ) : (
              <button
                type="button"
                className={`${styles.action} ${styles.caps}`}
                onClick={() => {
                  closeAll();
                  openBooking();
                }}
              >
                {bookLabel}
              </button>
            )}
            <button
              ref={menuBtnRef}
              type="button"
              className={`${styles.action} ${styles.menuAction} ${styles.caps}`}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
              onClick={() => {
                setDropdown(null);
                setOpen((v) => !v);
              }}
            >
              {open ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" ref={sheetRef} className={styles.sheet} data-open={open} inert={!open} data-lenis-prevent>
        <div className={styles.sheetInner}>
          <nav aria-label={t.a11y.mainNav}>
            <ul className={styles.sheetLinks}>
              {[
                { label: t.nav.start, href: "/" },
                { label: t.nav.treatments, href: "/#behandlungen" },
                { label: t.nav.studios, href: "/standorte" },
                ...t.nav.links,
              ].map((l, i) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={styles.sheetLink}
                    style={{ "--i": i } as CSSProperties}
                    onClick={(e) => follow(e, l.href)}
                  >
                    <span className={`t-mono ${styles.sheetIndex}`}>{String(i + 1).padStart(2, "0")}</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.sheetAside}>
            <div>
              <p className={`${styles.caps} ${styles.sheetLabel}`}>{t.nav.studios}</p>
              <ul className={styles.sheetStudios}>
                {STUDIOS.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/standorte/${s.slug}`} onClick={(e) => follow(e, `/standorte/${s.slug}`)}>
                      {s.city}
                    </Link>
                  </li>
                ))}
                {PLANNED_CITIES.map((city) => (
                  <li key={city} className={styles.dropMuted}>
                    {city} · {t.nav.planned}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={`${styles.caps} ${styles.sheetLabel}`}>{t.nav.contact}</p>
              <div className={styles.sheetContact}>
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </div>
            </div>
            {studio ? (
              <Button href={studio.booking} external size="lg" icon="external" className={styles.sheetBook}>
                {t.nav.book}
              </Button>
            ) : (
              <Button
                size="lg"
                icon="arrow"
                className={styles.sheetBook}
                onClick={() => {
                  closeAll();
                  openBooking();
                }}
              >
                {t.nav.book}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
