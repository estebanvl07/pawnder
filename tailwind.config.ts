import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        montserrat: "Montserrat, sans-serif",
      },
    },
  },
  plugins: [
    heroui({
      fontFamily: {
        montserrat: "Montserrat, sans-serif",
      },
    }),
  ],
} satisfies Config;
