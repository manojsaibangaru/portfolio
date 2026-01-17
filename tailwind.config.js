/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          950: "#05070A",
          900: "#070A10",
          850: "#090E16",
        },
        panel: {
          900: "rgba(10, 16, 26, 0.78)",
          850: "rgba(9, 14, 22, 0.78)",
        },
        cyber: {
          50: "#E7FFF7",
          100: "#C8FFEA",
          200: "#8BFFD5",
          300: "#4BFFBE",
          400: "#22F5A7",
          500: "#00E69A",
          600: "#00B978",
          700: "#008F5D",
          800: "#006846",
          900: "#0B3E2E",
        },
        threat: {
          500: "#FF3B72",
          600: "#E11D48",
        },
        warning: {
          500: "#F59E0B",
        },
      },
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
        ],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0, 230, 154, 0.18), 0 0 40px rgba(0, 230, 154, 0.12)",
        glowStrong:
          "0 0 0 1px rgba(0, 230, 154, 0.22), 0 0 60px rgba(0, 230, 154, 0.20)",
        threat: "0 0 0 1px rgba(255, 59, 114, 0.25), 0 0 40px rgba(255, 59, 114, 0.18)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(0,230,154,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,230,154,0.08) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(800px circle at var(--mx, 50%) var(--my, 30%), rgba(0,230,154,0.16), transparent 55%)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        scan: {
          "0%": { transform: "translateY(-30%)" },
          "100%": { transform: "translateY(130%)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-1px, 0)" },
          "40%": { transform: "translate(1px, -1px)" },
          "60%": { transform: "translate(0, 1px)" },
          "80%": { transform: "translate(1px, 0)" },
          "100%": { transform: "translate(0)" },
        },
      },
      animation: {
        floaty: "floaty 4s ease-in-out infinite",
        scan: "scan 3.2s linear infinite",
        glitch: "glitch 900ms ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
