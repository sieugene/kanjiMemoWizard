import { Header } from "@/widgets/Header";
import React, { FC } from "react";
import styled, { css, useTheme } from "styled-components";

export const MainLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  return (
    <main
      className={`dark text-foreground bg-background ${theme.fonts.base.config.variable}`}
    >
      <Header />
      <Container>{children}</Container>
    </main>
  );
};

const Container = styled.div.attrs({
  className: "container mx-auto px-4",
})`
  max-width: 1536px;
  margin: 0 auto;
  ${({ theme }) => css`
    ${theme.breakpoints.lessThan("2xl")} {
      max-width: 1280px;
    }
    ${theme.breakpoints.lessThan("xl")} {
      max-width: 1024px;
    }
    ${theme.breakpoints.lessThan("lg")} {
      max-width: 768px;
    }
    ${theme.breakpoints.lessThan("md")} {
      max-width: 640px;
    }
  `}
`;
