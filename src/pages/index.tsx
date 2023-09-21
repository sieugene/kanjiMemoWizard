import { Button } from "@nextui-org/react";
import { Inter } from "next/font/google";
import styled from "styled-components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className}`}>
      <StyledButton>test</StyledButton>
    </main>
  );
}

const StyledButton = styled(Button)`
  background: red;
`;
