import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium tracking-wide transition-all duration-300 ease-smooth active:translate-y-px disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary: "bg-ink text-ivory shadow-soft hover:bg-ink-soft hover:shadow-lift",
        accent: "bg-brass text-white shadow-soft hover:bg-[#8a5306] hover:shadow-lift",
        outline: "border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-ivory",
        ghost: "bg-transparent text-ink hover:bg-ink/5",
        light: "border border-line bg-paper text-ink shadow-soft hover:border-ink/30 hover:shadow-lift",
        dark: "bg-plush text-plush-on shadow-soft hover:bg-[#4a2a5a] hover:shadow-lift",
        plum: "bg-plush-solid text-plush-on shadow-soft hover:bg-[#4a2a5a] hover:shadow-lift",
        desire: "bg-desire-solid text-desire-on shadow-soft hover:bg-[#5f1830]",
        souffle: "bg-souffle-solid text-souffle-on shadow-soft hover:bg-[#7f3c11]",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-[0.95rem]",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
