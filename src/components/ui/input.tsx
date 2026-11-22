import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-full border border-line bg-paper px-4 text-sm text-ink placeholder:text-muted/80 shadow-[inset_0_1px_0_rgba(26,22,19,.03)] transition-colors duration-200 focus:border-ink/40 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-32 w-full rounded-md border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted/80 transition-colors duration-200 focus:border-ink/40 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("mb-1.5 block text-xs font-medium tracking-wide text-ink-soft", className)}
      {...props}
    />
  );
}
