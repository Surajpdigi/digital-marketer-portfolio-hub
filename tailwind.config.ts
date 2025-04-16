
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(221.2, 83.2%, 53.3%)", // Bright blue
          foreground: "hsl(210, 40%, 98%)", // Light white-blue
        },
        secondary: {
          DEFAULT: "hsl(209, 68%, 95%)", // Very light blue
          foreground: "hsl(221.2, 47.4%, 11.2%)",
        },
        muted: {
          DEFAULT: "hsl(210, 40%, 96.1%)", // Soft blue-white
          foreground: "hsl(215.4, 16.3%, 46.9%)",
        },
        accent: {
          DEFAULT: "hsl(210, 40%, 96.1%)",
          foreground: "hsl(222.2, 47.4%, 11.2%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)", // Pure white
          foreground: "hsl(222.2, 84%, 4.9%)",
        },
      },
      backgroundImage: {
        'gradient-blue-white': 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)',
      },
      boxShadow: {
        'blue-soft': '0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

