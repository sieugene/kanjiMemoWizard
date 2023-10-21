import { FONTS_CONFIG } from "./fonts";

const breakpointsValues = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export type BreakPoint = keyof typeof breakpointsValues;

export const theme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
    blue: "#3d5aa4",
  },
  fonts: {
    base: FONTS_CONFIG.inter,
  },
  breakpoints: {
    values: breakpointsValues,
    greaterThan: (n: BreakPoint) =>
      `@media screen and (min-width: ${breakpointsValues[n]}px)`,
    lessThan: (n: BreakPoint) =>
      `@media screen and (max-width: ${breakpointsValues[n] - 1}px)`,
    between: (first: BreakPoint, last: BreakPoint) =>
      `@media screen and (min-width: ${breakpointsValues[first]}px) and (max-width: ${breakpointsValues[last]}px)`,
  },
};
