import React from "react";

import { KanjiSearch } from "@/features/kanjiSearch/ui";
import { ROUTES } from "@/shared/routes";
import { SwitchLanguage } from "@/widgets/Language";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import NextLink from "next/link";
import styled, { css } from "styled-components";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBlurred>
      <NavbarContent>
        <Toogle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />

        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <Link
            href={ROUTES.home}
            className="font-bold text-inherit"
            as={NextLink}
          >
            簡単漢字
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <SearchWidget>
            <KanjiSearch />
          </SearchWidget>
        </NavbarItem>
        <NavbarItem>
          <SwitchLanguage />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu style={{ background: "#000000a8" }}>
        <SearchWidget isMobile>
          <NavbarMenuItem>
            <KanjiSearch />
          </NavbarMenuItem>
        </SearchWidget>
      </NavbarMenu>
    </Navbar>
  );
};

const Toogle = styled(NavbarMenuToggle)`
  ${({ theme }) => css`
    display: none;
    ${theme.breakpoints.lessThan("sm")} {
      display: block;
    }
  `}
`;

const SearchWidget = styled.div<{ isMobile?: boolean }>`
  ${({ theme, isMobile }) => css`
    display: ${isMobile ? "none" : "block"};
    ${theme.breakpoints.lessThan("sm")} {
      display: ${isMobile ? "block" : "none"};
    }
  `}
`;
