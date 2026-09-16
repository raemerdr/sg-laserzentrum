/** Thin line icons, one per benefit: results, cooling, certification. */
const PATHS: Record<string, React.ReactNode> = {
  // sparkle — visible results
  benefit1: (
    <>
      <path d="M14 3c1.3 6.6 3.4 8.7 10 10-6.6 1.3-8.7 3.4-10 10-1.3-6.6-3.4-8.7-10-10 6.6-1.3 8.7-3.4 10-10Z" />
      <path d="M24.5 19c.5 2.6 1.3 3.4 3.9 3.9-2.6.5-3.4 1.3-3.9 3.9-.5-2.6-1.3-3.4-3.9-3.9 2.6-.5 3.4-1.3 3.9-3.9Z" />
    </>
  ),
  // snowflake — contact cooling
  benefit2: (
    <>
      <path d="M16 3.5v25M5.2 9.75l21.6 12.5M26.8 9.75 5.2 22.25" />
      <path d="M12.6 6.4 16 9.1l3.4-2.7M12.6 25.6 16 22.9l3.4 2.7" />
      <path d="m5.6 14.2 1.2 3.9-3.7 1.5M26.4 17.8l-1.2-3.9 3.7-1.5" />
      <path d="m7 12.2 3.9-1.2 1.5 3.7M25 19.8l-3.9 1.2-1.5-3.7" />
    </>
  ),
  // shield with a check — certified expertise
  benefit3: (
    <>
      <path d="M16 3.4 26 7v7.4c0 6.6-4 11.4-10 13.2-6-1.8-10-6.6-10-13.2V7l10-3.6Z" />
      <path d="m11.6 15.4 3.1 3.1 6.1-6.6" />
    </>
  ),
};

export default function BenefitIcon({ id }: { id: string }) {
  return (
    <svg
      className="benefit__icon"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[id] ?? null}
    </svg>
  );
}
