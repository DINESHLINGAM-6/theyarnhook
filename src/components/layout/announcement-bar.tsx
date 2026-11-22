const ITEMS = [
  "Free shipping over ₹999",
  "New: Plush Luxe midnight drops",
  "7-day easy returns",
  "Dyed in small batches in India",
];

function Loop() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden className="shrink-0 opacity-60">
      <path
        d="M1 5c1.6-3 3.4-3 5 0s3.4 3 5 0 3.4-3 5 0"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-6 px-6">
          <span>{item}</span>
          <Loop />
        </span>
      ))}
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-ivory">
      <div className="relative overflow-hidden py-2.5">
        <div className="flex w-max animate-marquee text-[11px] tracking-wide will-change-transform hover:[animation-play-state:paused]">
          <Group />
          <Group hidden />
        </div>
      </div>
    </div>
  );
}
