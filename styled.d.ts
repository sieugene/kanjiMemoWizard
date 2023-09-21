/* eslint-disable no-unused-vars */
import { theme } from "@/shared/theme";
import "styled-components";

declare module "styled-components" {
  type CustomTheme = typeof theme;
  export interface DefaultTheme extends CustomTheme {}
}
