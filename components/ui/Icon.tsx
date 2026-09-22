const PATHS = {
  arrow: "M4 12h15m0 0-6-6m6 6-6 6",
  external: "M7 17 17 7m0 0H9m8 0v8",
  plus: "M12 5v14M5 12h14",
  close: "m6 6 12 12M18 6 6 18",
  menu: "M4 9h16M4 15h16",
  pin: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  phone: "M8.5 3h7A1.5 1.5 0 0 1 17 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 19.5v-15A1.5 1.5 0 0 1 8.5 3Zm2.5 15h2",
  clock: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 7.5V12l3 2",
  mail: "M4.5 5.5h15A1.5 1.5 0 0 1 21 7v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17V7a1.5 1.5 0 0 1 1.5-1.5Zm-1 1.5 8.5 5.5L20.5 7",
  chat: "M12 20a8 8 0 1 0-6.9-3.95L4 20l3.95-1.1A7.97 7.97 0 0 0 12 20Z",
  calendar: "M8 3v3M16 3v3M4 9.5h16M5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-12A1.5 1.5 0 0 1 5.5 5Z",
  chevron: "m6 9 6 6 6-6",
  check: "m5 12.5 4.5 4.5L19 7.5",
  // three people, the middle one in front
  users:
    "M9 8a3 3 0 1 0 6 0 3 3 0 1 0-6 0M6.5 19.5v-1a5.5 5.5 0 0 1 11 0v1M3.3 9.5a2.2 2.2 0 1 0 4.4 0 2.2 2.2 0 1 0-4.4 0M1.5 18.5V18a4 4 0 0 1 4.6-3.95M16.3 9.5a2.2 2.2 0 1 0 4.4 0 2.2 2.2 0 1 0-4.4 0M22.5 18.5V18a4 4 0 0 0-4.6-3.95",
  star: "M12 3 14.47 9.2 21.13 9.63 15.99 13.9 17.64 20.37 12 16.8 6.36 20.37 8.01 13.9 2.87 9.63 9.53 9.2Z",
  shield: "M12 3 4.5 6v5.5c0 4.6 3.1 8.4 7.5 9.5 4.4-1.1 7.5-4.9 7.5-9.5V6L12 3ZM8.8 12.2l2.2 2.2 4.3-4.4",
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
