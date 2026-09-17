import Image from "next/image";

/** Cover image that fills its positioned parent. */
export default function Photo({
  src,
  alt,
  sizes,
  preload = false,
  className,
  position = "50% 50%",
}: {
  src: string;
  alt: string;
  sizes: string;
  preload?: boolean;
  className?: string;
  position?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      className={className}
      style={{ objectFit: "cover", objectPosition: position }}
    />
  );
}
