import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Navy colors
    "bg-navy-950","bg-navy-900","bg-navy-800","bg-navy-700","bg-navy-600",
    "text-navy-950","border-navy-800",
    // Electric colors
    "bg-electric-900","bg-electric-800","bg-electric-700","bg-electric-600",
    "text-electric-600","text-electric-500","text-electric-400",
    "border-electric-700","border-electric-600",
    // Gradients
    "bg-gradient-electric","bg-gradient-apec",
    // Shadows
    "shadow-glow","shadow-glow-sm","shadow-glow-lg",
    // Animations
    "animate-glow-pulse","animate-float","animate-float-slow",
    "animate-light-move","animate-shimmer","animate-spin-slow",
    "animate-fade-up","animate-fade-in","animate-slide-in-left","animate-slide-in-right",
    // Fonts
    "font-display","font-sans","font-mono",
  ],
  theme: {
    extend: {
      colors: {
        // APEC GLOBAL Brand Colors
        navy: {
          950: "#020B1A",
          900: "#040F22",
          800: "#071629",
          700: "#0A1F38",
          600: "#0D2847",
          500: "#112F55",
        },
        electric: {
          900: "#003A99",
          800: "#004FCC",
          700: "#0066FF",
          600: "#1A7FFF",
          500: "#3399FF",
          400: "#66BBFF",
          300: "#99CCFF",
        },
        apec: {
          blue: "#0066FF",
          navy: "#0A1628",
          dark: "#040E1E",
          glow: "#00A8FF",
          accent: "#00D4FF",
          gold: "#FFB800",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Montserrat", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-apec": "linear-gradient(135deg, #020B1A 0%, #0A1628 40%, #0D2847 70%, #0066FF 100%)",
        "gradient-hero": "linear-gradient(135deg, rgba(2,11,26,0.95) 0%, rgba(10,22,40,0.85) 50%, rgba(0,102,255,0.3) 100%)",
        "gradient-card": "linear-gradient(135deg, rgba(10,22,40,0.8) 0%, rgba(13,40,71,0.6) 100%)",
        "gradient-glow": "radial-gradient(ellipse at center, rgba(0,102,255,0.3) 0%, transparent 70%)",
        "gradient-electric": "linear-gradient(135deg, #0066FF 0%, #00A8FF 50%, #00D4FF 100%)",
        "gradient-navy": "linear-gradient(180deg, #020B1A 0%, #0A1628 100%)",
        "grid-pattern": "linear-gradient(rgba(0,102,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(0,102,255,0.3)",
        "glow": "0 0 20px rgba(0,102,255,0.4), 0 0 40px rgba(0,102,255,0.2)",
        "glow-lg": "0 0 30px rgba(0,102,255,0.5), 0 0 60px rgba(0,102,255,0.3)",
        "glow-blue": "0 4px 20px rgba(0,102,255,0.4)",
        "card": "0 4px 24px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.1)",
        "card-hover": "0 8px 40px rgba(0,102,255,0.2), 0 2px 8px rgba(0,0,0,0.15)",
        "navy": "0 20px 60px rgba(2,11,26,0.8)",
        "inset-glow": "inset 0 1px 0 rgba(255,255,255,0.1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(0,102,255,0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(0,102,255,0.7), 0 0 60px rgba(0,102,255,0.4)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(5deg)" },
        },
        "light-move": {
          "0%": { transform: "translateX(-100%) skewX(-15deg)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { transform: "translateX(200%) skewX(-15deg)", opacity: "0" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "counter": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(0,102,255,0.3)" },
          "50%": { borderColor: "rgba(0,168,255,0.8)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "line-grow": {
          "0%": { width: "0", opacity: "0" },
          "100%": { width: "100%", opacity: "1" },
        },
        "particle-float": {
          "0%": { transform: "translateY(100vh) translateX(0px)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-10vh) translateX(50px)", opacity: "0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "float-slow": "float-slow 5s ease-in-out infinite",
        "light-move": "light-move 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin-slow 10s linear infinite",
        "border-glow": "border-glow 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 4s ease infinite",
        "line-grow": "line-grow 1s ease-out forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.6s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
