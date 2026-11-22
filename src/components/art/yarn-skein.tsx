import { cn } from "@/lib/utils";

interface YarnSkeinProps {
  palette: string[];
  uid: string;
  kind?: "skein" | "ball" | "texture";
  className?: string;
  title?: string;
}

const SKEIN_BODY =
  "M84 148C64 196 70 268 104 306C136 342 196 356 252 346C312 336 350 296 352 244C354 190 322 138 274 116C222 92 118 100 84 148Z";

const SKEIN_STRANDS = [
  "M60 168C132 138 252 138 362 174",
  "M58 196C140 168 262 168 364 204",
  "M56 224C140 196 264 198 366 234",
  "M58 252C142 228 262 230 364 264",
  "M64 280C146 258 262 262 356 292",
  "M78 308C156 290 258 296 342 320",
  "M126 96C108 168 110 280 138 358",
  "M176 92C160 168 162 282 182 362",
  "M226 96C216 174 218 286 232 358",
  "M276 108C270 182 272 288 278 348",
  "M320 128C318 198 318 290 310 332",
];

const BALL_STRANDS = [
  "M72 188C92 118 308 118 328 188",
  "M70 214C92 144 308 144 330 214",
  "M72 240C96 172 304 172 328 240",
  "M78 266C102 202 298 202 322 266",
  "M90 292C114 232 286 232 310 292",
  "M112 316C132 266 268 266 288 316",
  "M128 88C98 160 98 244 128 312",
  "M168 82C148 160 148 252 168 322",
  "M214 80C198 160 198 252 214 324",
  "M260 86C250 164 250 252 260 318",
];

export function YarnSkein({ palette, uid, kind = "skein", className, title }: YarnSkeinProps) {
  const key = uid.replace(/[^a-zA-Z0-9_-]/g, "") || "yarn";
  const p0 = palette[0] ?? "#7A1F3D";
  const p1 = palette[1] ?? p0;
  const p2 = palette[2] ?? p1;
  const p3 = palette[3] ?? p2;

  const a11y = title
    ? ({ role: "img", "aria-label": title } as const)
    : ({ "aria-hidden": true } as const);

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-full", className)}
      {...a11y}
    >
      <defs>
        <linearGradient id={`${key}-body`} x1="70" y1="70" x2="342" y2="344" gradientUnits="userSpaceOnUse">
          <stop stopColor={p0} />
          <stop offset="0.42" stopColor={p1} />
          <stop offset="1" stopColor={p2} />
        </linearGradient>
        <linearGradient id={`${key}-sheen`} x1="110" y1="90" x2="300" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.06" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${key}-glow`} cx="0.34" cy="0.28" r="0.72">
          <stop stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <filter id={`${key}-blur`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="11" />
        </filter>
        <clipPath id={`${key}-clip`}>
          {kind === "ball" ? (
            <circle cx="200" cy="200" r="120" />
          ) : (
            <path d={SKEIN_BODY} />
          )}
        </clipPath>
      </defs>

      <ellipse cx="208" cy="362" rx="118" ry="16" fill="#1A1613" opacity="0.14" filter={`url(#${key}-blur)`} />

      {kind === "texture" ? (
        <>
          <rect width="400" height="400" fill={p0} />
          <rect width="400" height="400" fill={`url(#${key}-body)`} opacity="0.55" />
          <g opacity="0.5">
            {Array.from({ length: 18 }).map((_, index) => {
              const col = index % 6;
              const row = Math.floor(index / 6);
              return (
                <ellipse
                  key={index}
                  cx={38 + col * 66}
                  cy={54 + row * 100}
                  rx="74"
                  ry="30"
                  transform={`rotate(${(index * 37) % 180} ${38 + col * 66} ${54 + row * 100})`}
                  stroke={index % 3 === 0 ? "#FFFFFF" : index % 2 === 0 ? p2 : p1}
                  strokeWidth={index % 4 === 0 ? 2.2 : 1.3}
                  opacity={0.3 + (index % 4) * 0.08}
                />
              );
            })}
          </g>
          <path
            d="M-20 300C80 250 140 340 240 280S360 200 440 240"
            stroke="#FFFFFF"
            strokeOpacity="0.18"
            strokeWidth="2"
          />
          <rect width="400" height="400" fill={`url(#${key}-glow)`} />
        </>
      ) : (
        <>
          <g clipPath={`url(#${key}-clip)`}>
            <rect x="40" y="70" width="330" height="300" fill={`url(#${key}-body)`} />
            {(kind === "ball" ? BALL_STRANDS : SKEIN_STRANDS).map((d, index) => (
              <path
                key={d}
                d={d}
                stroke={index % 3 === 0 ? "#FFFFFF" : index % 2 === 0 ? p2 : p3}
                strokeWidth={index % 4 === 0 ? 2.4 : 1.4}
                strokeLinecap="round"
                opacity={index % 3 === 0 ? 0.26 : 0.34}
              />
            ))}
            <path d={SKEIN_BODY} stroke={p2} strokeOpacity="0.35" strokeWidth="1.4" />
            <rect x="40" y="70" width="330" height="300" fill={`url(#${key}-sheen)`} />
          </g>

          {kind === "skein" ? (
            <>
              <g transform="rotate(-9 200 212)">
                <rect x="96" y="190" width="208" height="44" rx="7" fill="#FFFDF8" stroke={p2} strokeOpacity="0.28" />
                <circle cx="114" cy="212" r="4" fill={p0} />
                <text
                  x="200"
                  y="217"
                  textAnchor="middle"
                  fontFamily="Georgia, 'Times New Roman', serif"
                  fontSize="13"
                  letterSpacing="1.4"
                  fill="#1A1613"
                >
                  TheYarnHook
                </text>
              </g>
              <path
                d="M336 292C366 312 370 344 348 360C332 372 314 362 318 348"
                stroke={p1}
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M336 292C366 312 370 344 348 360C332 372 314 362 318 348"
                stroke="#FFFFFF"
                strokeOpacity="0.25"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              <ellipse cx="156" cy="150" rx="42" ry="26" fill="#FFFFFF" opacity="0.28" transform="rotate(-24 156 150)" />
              <path
                d="M318 286C344 300 350 326 334 340"
                stroke={p1}
                strokeWidth="6"
                strokeLinecap="round"
              />
            </>
          )}

          <rect width="400" height="400" fill={`url(#${key}-glow)`} />
        </>
      )}
    </svg>
  );
}
