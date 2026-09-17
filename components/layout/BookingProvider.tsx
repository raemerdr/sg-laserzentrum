"use client";

import { createContext, useCallback, useContext, useRef, type ReactNode } from "react";
import { PLANNED_CITIES, STUDIOS } from "@/lib/locations";
import { lockScroll } from "@/lib/scroll";
import { useCopy } from "../LangProvider";
import Icon from "../ui/Icon";
import styles from "./Booking.module.css";

type BookingContext = { openBooking: () => void };

const Ctx = createContext<BookingContext | null>(null);

/**
 * Booking is per studio (Studiolution), so "Termin buchen" opens a studio
 * chooser. Native <dialog> gives focus trapping and Escape for free.
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const t = useCopy();
  const ref = useRef<HTMLDialogElement>(null);

  const openBooking = useCallback(() => {
    const dialog = ref.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    lockScroll(true);
  }, []);

  const close = () => ref.current?.close();

  return (
    <Ctx.Provider value={{ openBooking }}>
      {children}
      <dialog
        ref={ref}
        className={styles.dialog}
        aria-labelledby="booking-title"
        onClose={() => lockScroll(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        // Native Escape handling is not triggered in every embedded browser.
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            close();
          }
        }}
        data-lenis-prevent
      >
        <div className={styles.inner}>
          <div className={styles.head}>
            <div>
              <span className={`t-mono ${styles.eyebrow}`}>{t.nav.book}</span>
              <h2 id="booking-title" className="t-h3">
                {t.booking.dialogTitle}
              </h2>
            </div>
            <button type="button" className={styles.close} onClick={close} aria-label={t.booking.close}>
              <Icon name="close" size={18} />
            </button>
          </div>
          <p className={styles.body}>{t.booking.dialogBody}</p>

          <ul className={styles.list}>
            {STUDIOS.map((s) => (
              <li key={s.slug}>
                <a className={styles.row} href={s.booking} target="_blank" rel="noopener noreferrer" onClick={close}>
                  <span>
                    <span className={styles.city}>{s.city}</span>
                    <span className={styles.address}>
                      {s.street}, {s.zip}
                    </span>
                  </span>
                  <span className={styles.arrow}>
                    <Icon name="external" size={16} />
                  </span>
                  <span className="sr-only">{t.a11y.opensNewTab}</span>
                </a>
              </li>
            ))}
            {PLANNED_CITIES.map((city) => (
              <li key={city} className={`${styles.row} ${styles.planned}`}>
                <span className={styles.city}>{city}</span>
                <span className="t-mono t-muted">{t.locations.planned}</span>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </Ctx.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
