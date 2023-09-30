/* eslint-disable no-unused-vars */
import { FontFamilyConfig } from "@root/tailwind.config";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Inter } from "next/font/google";

// After changes you should update here
// [tailwind.config.ts]

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

type TailwindFontFamily = keyof FontFamilyConfig["fontFamily"];
type Fonts = {
  [key in TailwindFontFamily]: {
    config: NextFontWithVariable;
    _variable: string;
  };
};

export const FONTS_CONFIG: Fonts = {
  inter: {
    config: inter,
    _variable: "--font-inter",
  },
};
