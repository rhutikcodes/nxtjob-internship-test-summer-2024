import type { Config } from "tailwindcss";

import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customPurple: '#7047EB',
        lightPurple: '#E2DAFB',
        customLightGray: '#8A8AA3',
        primaryPink: '#FE5BAC',
        primaryPurple: '#7047EB',
        primaryOrange: '#FF7D52'
      },
      gap: {
        'custom': '0.5rem var(--spacing-2, 0.5rem)',
      },

    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
