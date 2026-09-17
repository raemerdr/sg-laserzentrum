"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCopy } from "../LangProvider";
import Icon from "./Icon";
import styles from "./Button.module.css";

type Common = {
  children: ReactNode;
  variant?: "black" | "paper" | "stone" | "white" | "glass";
  size?: "sm" | "md" | "lg";
  icon?: "arrow" | "external";
  block?: boolean;
  className?: string;
};

type LinkProps = Common & { href: string; external?: boolean; onClick?: () => void };
type ActionProps = Common & { href?: undefined; onClick?: () => void; type?: "button" | "submit" };

export default function Button(props: LinkProps | ActionProps) {
  const t = useCopy();
  const { children, variant = "black", size = "md", icon, block, className = "" } = props;
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${block ? styles.block : ""} ${className}`;
  const glyph = icon ? <Icon name={icon} className={styles.icon} data-icon={icon} /> : null;

  if (props.href === undefined) {
    return (
      <button type={props.type ?? "button"} className={cls} onClick={props.onClick}>
        {children}
        {glyph}
      </button>
    );
  }

  const { href, external, onClick } = props;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
        {glyph}
        <span className="sr-only">{t.a11y.opensNewTab}</span>
      </a>
    );
  }
  if (/^(mailto|tel|https?):/.test(href)) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
        {glyph}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick}>
      {children}
      {glyph}
    </Link>
  );
}
