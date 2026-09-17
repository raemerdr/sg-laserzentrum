const PATHS = {
  arrow: "M4 12h15m0 0-6-6m6 6-6 6",
  external: "M7 17 17 7m0 0H9m8 0v8",
  plus: "M12 5v14M5 12h14",
  close: "m6 6 12 12M18 6 6 18",
  menu: "M4 9h16M4 15h16",
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({
  name,
  size = 16,
  className,
  ...rest
}: { name: IconName; size?: number; className?: string } & { [data: `data-${string}`]: string }) {
  return (
    <svg
      {...rest}
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
