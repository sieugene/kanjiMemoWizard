import type { Config } from "tailwindcss";
import { ThemeConfig } from "tailwindcss/types/config";
const { nextui } = require("@nextui-org/react");

export type FontFamilyConfig = Partial<ThemeConfig> & {
  fontFamily: {
    inter: string[];
  };
};

type TailwindConfig = Config & {
  theme: Config["theme"] & {
    extend: FontFamilyConfig & {
      backgroundImage: {
        [key: string]: string;
      };
    };
  };
};

const config: TailwindConfig = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        inter: [`var(--font-inter)`],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
