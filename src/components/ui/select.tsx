import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className={cn("relative", className)}>
    <select
      ref={ref}
      className="h-11 w-full cursor-pointer appearance-none rounded-full border border-line bg-paper pl-4 pr-10 text-sm text-ink transition-colors hover:border-ink/30 focus:border-ink/40 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      {...props}
    >
      {children}
    </select>
    <ChevronDown
      size={15}
      aria-hidden
      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
    />
  </div>
));
Select.displayName = "Select";
