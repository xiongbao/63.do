import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "section": "0 0 0 1px rgba(172, 181, 200, .06), 0 1px 1px -0.5px rgba(172, 181, 200, .06), 0 3px 3px -1.5px rgba(172, 181, 200, .06), 0 6px 6px -3px rgba(172, 181, 200, .06), 0 12px 12px -6px rgba(172, 181, 200, .06), 0 24px 24px rgba(172, 181, 200, .08)",
      },
    },
  },
  plugins: [],
};
export default config;
