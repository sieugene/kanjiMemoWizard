import { BreakPoint } from "@/shared/theme";
import styled, { css } from "styled-components";

export const Media = styled.div<{ displayOn: BreakPoint }>`
  ${({ theme, displayOn }) => css`
    display: none;
    ${theme.breakpoints.lessThan(displayOn)} {
      display: block;
    }
  `}
`;
