"use client";

import { useEffect, useId, useImperativeHandle, useRef, useState, type KeyboardEvent, type Ref } from "react";
import Icon from "./Icon";
import styles from "./Listbox.module.css";

export type ListboxOption = { value: string; label: string; hint?: string };
export type ListboxHandle = { open: () => void };

/**
 * A styled select: a button that opens a list of options above or below it.
 * Keyboard follows the select-only combobox pattern: arrows and Home/End move,
 * Enter or Space picks, Escape closes, a letter jumps to the next match.
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
  placement?: "top" | "bottom";
  ref?: Ref<ListboxHandle>;
}) {
  const baseId = useId();
  const labelId = `${baseId}-label`;
  const listId = `${baseId}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = options[selectedIndex];

  const show = (index = Math.max(selectedIndex, 0)) => {
    setActive(index);
    setOpen(true);
  };

  const choose = (index: number) => {
    onChange(options[index].value);
    setOpen(false);
    buttonRef.current?.focus();
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      buttonRef.current?.focus();
      show();
    },
  }));

  // a press anywhere outside closes the list
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        show(e.key === "ArrowUp" && selectedIndex < 0 ? last : undefined);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(last, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        if (e.key.length === 1) {
          const key = e.key.toLowerCase();
          const next = options.findIndex((o, i) => i > active && o.label.toLowerCase().startsWith(key));
          const first = options.findIndex((o) => o.label.toLowerCase().startsWith(key));
          if (next >= 0 || first >= 0) setActive(next >= 0 ? next : first);
        }
    }
  };

  return (
    <div ref={rootRef} className={styles.root} data-open={open} data-placement={placement}>
      <span id={labelId} className="sr-only">
        {label}
      </span>
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        className={styles.trigger}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
      >
        <span className={selected ? styles.value : styles.placeholder}>{selected ? selected.label : placeholder}</span>
        <Icon name="chevron" size={16} className={styles.chevron} />
      </button>

      {/* options are picked with the pointer here; the keyboard drives them from the button above */}
      <ul id={listId} role="listbox" aria-labelledby={labelId} className={styles.list} data-lenis-prevent>
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
            {option.value === value && <Icon name="check" size={16} className={styles.check} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
