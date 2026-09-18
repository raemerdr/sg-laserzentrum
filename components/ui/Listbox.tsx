"use client";

import {
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type Ref,
} from "react";
import { createPortal } from "react-dom";
import { NAV_OFFSET, lockScroll } from "@/lib/scroll";
import { useCopy } from "../LangProvider";
import Icon from "./Icon";
import styles from "./Listbox.module.css";

export type ListboxOption = { value: string; label: string; hint?: string };
export type ListboxHandle = { open: () => void };

/** Phones get a full-screen sheet instead of a floating list. */
const SHEET_QUERY = "(max-width: 699px)";
/** Space between field and list, and the least the list keeps from the screen's edges. */
const GAP = 12;
const EDGE = 12;
/** The list starts at the field's left padding rather than at its text. */
const INSET = 16;
const MIN_WIDTH = 260;
const MAX_HEIGHT = 480;

function subscribeSheet(onChange: () => void) {
  const query = window.matchMedia(SHEET_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const noSubscribe = () => () => {};

/**
 * A styled select: a button that opens a list of options. On larger screens
 * the list floats above or below the field, whichever side has room, and never
 * runs past the screen or under the nav. It sits at the end of the page, so no
 * section's clipping or the footer can cover it. On phones the options open as
 * a full-screen sheet instead. Keyboard follows the select-only combobox
 * pattern: arrows and Home/End move, Enter or Space picks, Escape closes, a
 * letter jumps to the next match.
 */
export default function Listbox({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
  placement = "bottom",
  ref,
}: {
  id?: string;
  label: string;
  placeholder: string;
  options: ListboxOption[];
  value: string;
  onChange: (value: string) => void;
  /** Preferred side; the list moves to the other side when it fits better there. */
  placement?: "top" | "bottom";
  ref?: Ref<ListboxHandle>;
}) {
  const t = useCopy();
  const baseId = useId();
  const labelId = `${baseId}-label`;
  const titleId = `${baseId}-title`;
  const listId = `${baseId}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const sheet = useSyncExternalStore(subscribeSheet, () => window.matchMedia(SHEET_QUERY).matches, () => false);
  // the floating list lives in <body>, which only exists in the browser
  const mounted = useSyncExternalStore(noSubscribe, () => true, () => false);
  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = options[selectedIndex];

  const reveal = (index: number) => listRef.current?.children[index]?.scrollIntoView({ block: "nearest" });

  const show = (index = Math.max(selectedIndex, 0)) => {
    setActive(index);
    setOpen(true);
  };

  const close = () => setOpen(false);

  const choose = (index: number) => {
    onChange(options[index].value);
    setOpen(false);
    // the sheet hands focus back itself once it has closed
    if (!sheet) buttonRef.current?.focus();
  };

  const move = (index: number) => {
    setActive(index);
    reveal(index);
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      buttonRef.current?.focus();
      show();
    },
  }));

  /** Fits the floating list to the screen: preferred side if it fits, else the roomier one. */
  const place = useCallback(() => {
    const root = rootRef.current;
    const list = listRef.current;
    if (!root || !list) return;
    const field = root.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;
    const width = Math.min(Math.max(MIN_WIDTH, field.width + INSET), viewportWidth - 2 * EDGE);
    const left = Math.min(Math.max(EDGE, field.left - INSET), viewportWidth - EDGE - width);
    list.style.left = `${left}px`;
    list.style.width = `${width}px`;
    list.style.maxHeight = "none";
    const natural = Math.min(list.scrollHeight, MAX_HEIGHT);
    const above = field.top - GAP - NAV_OFFSET;
    const below = viewportHeight - field.bottom - GAP - EDGE;
    const [preferred, other] = placement === "top" ? [above, below] : [below, above];
    const flip = natural > preferred && other > preferred;
    const side = flip ? (placement === "top" ? "bottom" : "top") : placement;
    const room = side === "top" ? above : below;
    list.style.maxHeight = `${Math.max(0, Math.min(natural, room))}px`;
    list.style.top = side === "bottom" ? `${field.bottom + GAP}px` : "";
    list.style.bottom = side === "top" ? `${viewportHeight - field.top + GAP}px` : "";
    list.dataset.placement = side;
  }, [placement]);

  useLayoutEffect(() => {
    if (open && !sheet) place();
  }, [open, sheet, place]);

  // the floating list follows the field while the page scrolls, and closes once the field leaves the screen
  useEffect(() => {
    if (!open || sheet) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const field = rootRef.current?.getBoundingClientRect();
        if (!field || field.bottom < NAV_OFFSET || field.top > window.innerHeight) setOpen(false);
        else place();
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [open, sheet, place]);

  // a press anywhere outside closes the floating list
  useEffect(() => {
    if (!open || sheet) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!rootRef.current?.contains(target) && !listRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, sheet]);

  // While open, the sheet is a modal dialog: the page holds still and focus is
  // in the list. Closing, or the sheet giving way to the floating list when a
  // phone turns, undoes all of it once.
  useEffect(() => {
    const dialog = dialogRef.current;
    const button = buttonRef.current;
    const list = listRef.current;
    if (!open || !sheet || !dialog) return;
    if (!dialog.open) dialog.showModal();
    lockScroll(true);
    list?.focus();
    list?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
    return () => {
      if (dialog.open) dialog.close();
      lockScroll(false);
      button?.focus({ preventScroll: true });
    };
  }, [open, sheet]);

  /** Keys while the options are showing: from the button (floating list) or the list itself (sheet). */
  const onOpenKeyDown = (e: KeyboardEvent) => {
    const last = options.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        move(Math.min(last, active + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        move(Math.max(0, active - 1));
        break;
      case "Home":
        e.preventDefault();
        move(0);
        break;
      case "End":
        e.preventDefault();
        move(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        if (!sheet) setOpen(false);
        break;
      default:
        if (e.key.length === 1) {
          const key = e.key.toLowerCase();
          const next = options.findIndex((o, i) => i > active && o.label.toLowerCase().startsWith(key));
          const first = options.findIndex((o) => o.label.toLowerCase().startsWith(key));
          if (next >= 0 || first >= 0) move(next >= 0 ? next : first);
        }
    }
  };

  const onButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (open) return onOpenKeyDown(e);
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      show(e.key === "ArrowUp" && selectedIndex < 0 ? options.length - 1 : undefined);
    }
  };

  const list = (
    <ul
      ref={listRef}
      id={listId}
      role="listbox"
      aria-labelledby={labelId}
      aria-activedescendant={sheet && open ? `${listId}-${active}` : undefined}
      tabIndex={sheet ? 0 : undefined}
      className={sheet ? styles.sheetList : styles.list}
      data-open={open}
      onKeyDown={sheet ? onOpenKeyDown : undefined}
      data-lenis-prevent
    >
      {options.map((option, i) => (
        <li
          key={option.value}
          id={`${listId}-${i}`}
          role="option"
          aria-selected={option.value === value}
          className={styles.option}
          data-active={open && i === active}
          onPointerMove={() => setActive(i)}
          onClick={() => choose(i)}
        >
          <span className={styles.label}>{option.label}</span>
          {option.hint && <span className={styles.hint}>{option.hint}</span>}
          {option.value === value && <Icon name="check" size={18} className={styles.check} />}
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={rootRef} className={styles.root} data-open={open}>
      <span id={labelId} className="sr-only">
        {label}
      </span>
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-labelledby={labelId}
        aria-haspopup={sheet ? "dialog" : "listbox"}
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={!sheet && open ? `${listId}-${active}` : undefined}
        className={styles.trigger}
        onClick={() => (open ? close() : show())}
        onKeyDown={onButtonKeyDown}
      >
        <span className={selected ? styles.value : styles.placeholder}>{selected ? selected.label : placeholder}</span>
        <Icon name="chevron" size={16} className={styles.chevron} />
      </button>

      {sheet ? (
        <dialog
          ref={dialogRef}
          className={styles.sheet}
          aria-labelledby={titleId}
          onClose={close}
          // Native Escape handling is not triggered in every embedded browser.
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              close();
            }
          }}
        >
          <div className={styles.sheetHead}>
            <h2 id={titleId} className={styles.sheetTitle}>
              {label}
            </h2>
            <button type="button" className={styles.close} onClick={close} aria-label={t.nav.close}>
              <Icon name="close" size={18} />
            </button>
          </div>
          {list}
        </dialog>
      ) : (
        mounted && createPortal(list, document.body)
      )}
    </div>
  );
}
