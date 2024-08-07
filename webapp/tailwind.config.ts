import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
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
      fontFamily: {
        iaWriterDuo: "var(--font-iawriter-duo)",
        iaWriterDuoItalic: "var(--font-iawriter-duo-italic)",
        iaWriterQuattro: "var(--font-iawriter-quattro)",
        iaWriterQuattroItalic: "var(--font-iawriter-quattro-italic)",
        iaWriterMono: "var(--font-iawriter-mono)",
        iaWriterMonoItalic: "var(--font-iawriter-mono-italic)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
export default config;
