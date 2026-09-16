export default function Stars({ label }: { label: string }) {
  return (
    <span className="stars" role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 .9l2.06 4.42 4.84.63-3.56 3.32.92 4.8L8 11.72 3.74 14.07l.92-4.8L1.1 5.95l4.84-.63L8 .9Z" />
        </svg>
      ))}
    </span>
  );
}
