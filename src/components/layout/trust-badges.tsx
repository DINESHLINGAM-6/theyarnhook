import Link from "next/link";

const TRUSTS = [
  { label: "Free shipping", detail: "Over ₹999", icon: "truck" },
  { label: "Easy returns", detail: "7-day policy", icon: "rotate-ccw" },
  { label: "Secure checkout", detail: "UPI, cards & net banking", icon: "shield-check" },
  { label: "Genuine yarn", detail: "Small-batch dyed in India", icon: "sparkles" },
];

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  truck: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="1" y="3" width="8" height="12" />
      <circle cx="7" cy="16" r="2" />
      <circle cx="17" cy="16" r="2" />
      <path d="M3 3h18v2H3z" />
    </svg>
  ),
  "rotate-ccw": ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M1 4v6h6" />
      <path d="M10 12a6 6 0 0 0 6-6 6 6 0 0 0-6-6" />
    </svg>
  ),
  "shield-check": ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 2l4 9v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9l4-9" />
      <path d="m9 11 2 2 4-4" />
    </svg>
  ),
  sparkles: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 1l3 6h6l-3 6 1.414 1.414L16 13l-6 3-6-3 1.414-1.414L6 13l3-6H6z" />
    </svg>
  ),
};

export function TrustBadges() {
  return (
    <div className="trust-row">
      {TRUSTS.map((trust) => {
        const Icon = ICONS[trust.icon];
        return (
          <Link
            key={trust.label}
            href="/faq"
            className="trust-item hover:no-underline"
            aria-label={trust.label}
          >
            <Icon className="shrink-0" />
            <span>
              {trust.label}
              <br />
              <span className="text-[10px] opacity-70 font-normal">{trust.detail}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
