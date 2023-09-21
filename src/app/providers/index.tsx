import { theme } from "@/shared/theme";
import { NextUIProvider } from "@nextui-org/react";
import React, { FC } from "react";
import { ThemeProvider } from "styled-components";

export const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <NextUIProvider>{children}</NextUIProvider>
    </ThemeProvider>
  );
};
