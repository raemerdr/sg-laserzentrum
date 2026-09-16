import Image from "next/image";
import { IMAGES } from "@/lib/content";

type Props = {
  /** key into the IMAGES map */
  id?: string;
  /** direct path, used when the image comes from data rather than the map */
  src?: string;
  label: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Fills its (positioned) parent. Renders the photo when one is available,
 * otherwise a labelled placeholder that reads as a photo area.
 */
export default function ImageSlot({ id, src, label, className, priority, sizes }: Props) {
  const source = src ?? (id ? IMAGES[id] : null);
  if (source) {
    return (
      <Image
        src={source}
        alt={label}
        fill
        priority={priority}
        sizes={sizes ?? "100vw"}
        className={`slot-img ${className ?? ""}`}
      />
    );
  }
  return (
    <div className={`slot-ph ${className ?? ""}`} role="img" aria-label={label}>
      <span className="slot-ph__label">{label}</span>
    </div>
  );
}
