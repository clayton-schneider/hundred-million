/** @type {import('tailwindcss').Config} */

const FONT_FAMILY_BASE = [
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "Open Sans",
  "Helvetica Neue",
  "sans-serif",
];

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["Bebas Neue", ...FONT_FAMILY_BASE],
        sans: ["Montserrat", ...FONT_FAMILY_BASE],
      },
      colors: {
        primary: "#BA0D2F",
        "primary-darker": "#AD0C2D",
        "text-light": "#FFFFFF",
        "text-dark": "#000000",
      },
      padding: {
        edge: "2.5%",
      },
    },
  },
  plugins: [],
};
