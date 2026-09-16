export default function PillButton({
  href,
  children,
  external = false,
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  size?: "md" | "sm";
}) {
  return (
    <a
      href={href}
      className={`pill${size === "sm" ? " pill--sm" : ""}`}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {/* The body grows with the label; the tail holds the notch and arrow circle. */}
      <span className="pill__body">
        <span className="pill__label">{children}</span>
      </span>
      <span className="pill__tail">
        <svg className="pill__tail-bg" viewBox="0 0 78 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 0 0 C 8.857 0 16.818 3.839 22.309 9.943 C 23.2 10.933 24.8 10.933 25.691 9.943 C 31.182 3.839 39.143 0 48 0 C 64.569 0 78 13.431 78 30 C 78 46.569 64.569 60 48 60 C 39.143 60 31.182 56.161 25.691 50.056 C 24.8 49.066 23.2 49.066 22.309 50.056 C 16.818 56.161 8.857 60 0 60 Z" />
        </svg>
        <svg className="pill__arrow" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.43 5.4a.75.75 0 0 0-1.06 1.06L18.44 11.5H3.5a.75.75 0 0 0 0 1.5h14.94l-5.07 5.04a.75.75 0 1 0 1.06 1.06l6.6-6.57a.75.75 0 0 0 0-1.06l-6.6-6.57Z" />
        </svg>
      </span>
    </a>
  );
}
