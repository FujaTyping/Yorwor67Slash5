import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "yorwor-light": {
          extend: "light",
          colors: {
            background: "#ffffff",
            foreground: "#000000",
            primary: {
              50: "#09506c",
              100: "#0f4f83",
              200: "#1880a2",
              300: "#239bc2",
              400: "#31aae2",
              500: "#62c6ed",
              600: "#82cef6",
              700: "#ade3fc",
              800: "#d5effd",
              900: "#ecf5fe",
              DEFAULT: "#2fdaff",
              foreground: "#ffffff",
            },
            focus: "#ff4c4c",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
};
export default config;
