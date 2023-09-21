import { NextUIProvider } from "@nextui-org/react";
import React, { FC } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
  },
};

export const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <NextUIProvider>{children}</NextUIProvider>
    </ThemeProvider>
  );
};
