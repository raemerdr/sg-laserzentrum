import type { ReactNode } from "react";
import styles from "./Panel.module.css";

export default function Panel({
  children,
  overhang = false,
  className = "",
  id,
}: {
  children: ReactNode;
  /** Extend 80px into the following sticky section with a soft bottom edge. */
  overhang?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={`${styles.panel} ${overhang ? styles.overhang : ""} ${className}`}>
      {children}
    </div>
  );
}
