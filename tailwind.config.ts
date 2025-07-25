import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#002B5B",
          hover: "#004080",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#D4AF37",
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
        sadef: {
          gold: "#BDA25A",
          "gold-dark": "#A8935A",
          grey: "#878787",
          "grey-light": "#F5F5F5",
        },
        generalText : {
          DEFAULT: "#333333",
        },
        link: {
          DEFAULT: "#004080",
        },
        'bg-light': {
          DEFAULT: "#F9F9F9",
        },
        'bg-main': {
          DEFAULT: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        arabic: ["IBM Plex Arabic", "sans-serif"],
      },
      fontSize: {
        h1: [
          "2rem",
          {
            lineHeight: "2.25rem",
            fontWeight: "700",
          },
        ],
        'h1-min': [
          "1.75rem",
          {
            lineHeight: "2rem",
            fontWeight: "700",
          },
        ],
        h2: [
          "1.625rem",
          {
            lineHeight: "2rem",
            fontWeight: "600",
          },
        ],
        'h2-min': [
          "1.5rem",
          {
            lineHeight: "1.75rem",
            fontWeight: "600",
          },
        ],
        h3: [
          "1.375rem",
          {
            lineHeight: "1.75rem",
            fontWeight: "600",
          },
        ],
        'h3-min': [
          "1.25rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "600",
          },
        ],
        body: [
          "1rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "400",
          },
        ],
        primaryText: [
          "1rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "400",
          },
        ],
        secondaryText: [
          "0.875rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "400",
          },
        ],
        helper: [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            fontWeight: "400",
          },
        ],
        footer: [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
