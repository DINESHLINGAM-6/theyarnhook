import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "var(--ivory)",
        oat: "var(--oat)",
        paper: "var(--paper)",
        ink: { DEFAULT: "var(--ink)", soft: "var(--ink-soft)" },
        muted: "var(--muted)",
        line: "var(--line)",
        brass: { DEFAULT: "var(--brass)", soft: "var(--brass-soft)" },
        sale: "var(--sale)",
        success: { DEFAULT: "var(--success)", solid: "#2f6b4f", tint: "#E3F0EA", ink: "#1E4533", on: "#F2F9F4" },
        desire: { solid: "#7A1F3D", tint: "#F4DCE2", ink: "#4A1024", on: "#FFF6F8" },
        milka: { solid: "#6B4A2C", tint: "#F3E7D6", ink: "#3A2716", on: "#FFFBF4" },
        souffle: { solid: "#9A4A16", tint: "#FBE3CC", ink: "#5A2A0C", on: "#FFF8F0" },
        plush: { solid: "#3A2350", tint: "#E7DEF0", ink: "#241430", on: "#F7F1FF" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: { sm: "8px", md: "14px", lg: "22px", xl: "32px", "4xl": "2.5rem" },
      boxShadow: {
        soft: "0 1px 2px rgba(26,22,19,.04), 0 8px 30px -12px rgba(26,22,19,.12)",
        lift: "0 2px 4px rgba(26,22,19,.05), 0 24px 50px -18px rgba(26,22,19,.22)",
        drawer: "-24px 0 60px -20px rgba(26,22,19,.25)",
        card: "0 1px 0 rgba(26,22,19,.03), 0 18px 40px -30px rgba(26,22,19,.35)",
      },
      transitionTimingFunction: { smooth: "cubic-bezier(.22,1,.36,1)" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "none" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(.9)", opacity: ".7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "draw-line": { from: { strokeDashoffset: "1" }, to: { strokeDashoffset: "0" } },
      },
      animation: {
        marquee: "marquee 36s linear infinite",
        shimmer: "shimmer 1.8s infinite",
        float: "float 7s ease-in-out infinite",
        "fade-up": "fade-up .6s cubic-bezier(.22,1,.36,1) both",
        "pulse-ring": "pulse-ring 1.6s ease-out infinite",
      },
      maxWidth: { container: "80rem", wide: "90rem" },
      screens: { xs: "400px" },
      backgroundImage: {
        "gradient-desire": "linear-gradient(135deg, #7A1F3D, #B98A5E)",
      },
    },
  },
  plugins: [],
};

export default config;
