import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("h-7 w-7", className)}
    >
      <path
        d="M4.5 26.5c0-9.4 6.3-16.5 15.2-16.5 5 0 7.8 3 7.8 7s-3 7-7.8 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M20.5 8.8l4.6 4.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="27.2" cy="5.8" r="2.1" fill="currentColor" />
    </svg>
  );
}
