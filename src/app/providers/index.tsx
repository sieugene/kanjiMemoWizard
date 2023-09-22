import { theme } from "@/shared/theme";
import { NextUIProvider } from "@nextui-org/react";
import React, { FC } from "react";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";

export const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <ThemeProvider theme={theme}>
        <NextUIProvider>{children}</NextUIProvider>
      </ThemeProvider>
    </SWRConfig>
  );
};
