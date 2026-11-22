import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] leading-none",
  {
    variants: {
      variant: {
        sale: "bg-sale text-white",
        new: "bg-ink text-ivory",
        bestseller: "bg-brass text-white",
        low: "bg-[#F6E3C8] text-[#7a2a0c]",
        neutral: "bg-ink/[0.06] text-ink-soft",
        paper: "bg-paper/90 text-ink-soft",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
