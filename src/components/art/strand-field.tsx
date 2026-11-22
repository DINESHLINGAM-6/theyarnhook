import { cn } from "@/lib/utils";

interface StrandFieldProps {
  palette: string[];
  uid: string;
  className?: string;
  opacity?: number;
}

const STRANDS = [
  "M-40 640C120 540 220 680 380 560S620 440 860 540",
  "M-40 540C140 440 240 580 400 460S640 340 860 440",
  "M-40 740C120 640 240 780 400 660S660 540 860 640",
  "M-40 440C160 340 260 480 420 360S660 240 860 340",
  "M-40 340C160 240 260 380 420 260S660 140 860 240",
  "M-40 840C160 740 260 880 420 760S660 640 860 740",
];

export function StrandField({ palette, uid, className, opacity = 0.5 }: StrandFieldProps) {
  const key = uid.replace(/[^a-zA-Z0-9_-]/g, "") || "strand";
  const p0 = palette[0] ?? "#7A1F3D";
  const p1 = palette[1] ?? p0;
  const p2 = palette[2] ?? p1;

  return (
    <svg
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("pointer-events-none", className)}
    >
      <defs>
        <linearGradient id={`${key}-strand`} x1="0" y1="0" x2="800" y2="800" gradientUnits="userSpaceOnUse">
          <stop stopColor={p0} stopOpacity="0" />
          <stop offset="0.3" stopColor={p1} />
          <stop offset="0.7" stopColor={p2} />
          <stop offset="1" stopColor={p0} stopOpacity="0" />
        </linearGradient>
      </defs>
      <g opacity={opacity}>
        {STRANDS.map((d, index) => (
          <path
            key={d}
            d={d}
            stroke={`url(#${key}-strand)`}
            strokeWidth={index % 3 === 0 ? 2.4 : 1.3}
            strokeLinecap="round"
            opacity={0.5 + (index % 3) * 0.15}
          />
        ))}
        <circle cx="250" cy="230" r="4" fill={p1} opacity="0.7" />
        <circle cx="560" cy="470" r="3" fill={p2} opacity="0.7" />
        <circle cx="430" cy="610" r="5" fill={p1} opacity="0.5" />
      </g>
    </svg>
  );
}
