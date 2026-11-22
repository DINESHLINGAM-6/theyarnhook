import { cn } from "@/lib/utils";

export function Separator({ className }: { className?: string }) {
  return <div role="separator" className={cn("h-px w-full bg-line", className)} />;
}

export function StitchDivider({ className, tone = "currentColor" }: { className?: string; tone?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 12"
      className={cn("h-3 w-[120px]", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 6c6-6 10 6 16 0s10 6 16 0 10 6 16 0 10 6 16 0 10 6 16 0 10 6 16 0"
        stroke={tone}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
