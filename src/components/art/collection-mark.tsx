import { cn } from "@/lib/utils";
import type { CollectionSymbol } from "@/lib/commerce/types";

interface CollectionMarkProps {
  symbol: CollectionSymbol;
  className?: string;
}

export function CollectionMark({ symbol, className }: CollectionMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("h-6 w-6", className)}
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {symbol === "rose" ? (
        <>
          <path d="M12 3.5c4.7 0 8.5 3.8 8.5 8.5s-3.8 8.5-8.5 8.5S3.5 16.7 3.5 12 7.3 3.5 12 3.5Z" />
          <path d="M12 7.2c2.7 0 4.8 2.1 4.8 4.8s-2.1 4.8-4.8 4.8S7.2 14.7 7.2 12 9.3 7.2 12 7.2Z" />
          <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
        </>
      ) : null}
      {symbol === "milk" ? (
        <>
          <path d="M12 3.2c3.4 4.1 6 6.7 6 10.1a6 6 0 0 1-12 0c0-3.4 2.6-6 6-10.1Z" />
          <path d="M9.4 14.2c.3 1.5 1.3 2.4 2.7 2.6" />
        </>
      ) : null}
      {symbol === "puff" ? (
        <>
          <path d="M7 18.5a4.2 4.2 0 0 1-.6-8.4A5.1 5.1 0 0 1 16 8.8a3.6 3.6 0 0 1 2 6.7 3 3 0 0 1-1 3H7Z" />
          <path d="M8.5 15.2c1.6-1 5.4-1 7 0" />
        </>
      ) : null}
      {symbol === "star" ? (
        <>
          <path d="M12 2.8c.7 4.9 2.6 6.8 7.5 7.5-4.9.7-6.8 2.6-7.5 7.5-.7-4.9-2.6-6.8-7.5-7.5 4.9-.7 6.8-2.6 7.5-7.5Z" />
          <path d="M18.5 16.5c.3 1.7 1 2.4 2.7 2.7-1.7.3-2.4 1-2.7 2.7-.3-1.7-1-2.4-2.7-2.7 1.7-.3 2.4-1 2.7-2.7Z" />
        </>
      ) : null}
    </svg>
  );
}
