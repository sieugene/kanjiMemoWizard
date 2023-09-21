import { KANJI_LIST } from "@/shared/data";
import { Button } from "@nextui-org/react";
import { Inter } from "next/font/google";
import { useState } from "react";

import styled from "styled-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { SwitchLanguage } from "@/widgets/Language";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [list] = useState(KANJI_LIST);
  const { t } = useTranslation();

  return (
    <main className={`${inter.className}`}>
      <SwitchLanguage />
      <h2>{t("title")}</h2>
      <h2>{t("generate")}</h2>
      <StyledButton>test</StyledButton>
      <List>
        {list.map((info) => (
          <Item key={info.kanji}>
            <h4>{info.kanji}</h4>
          </Item>
        ))}
      </List>
    </main>
  );
}

const StyledButton = styled(Button)`
  background: red;
`;

const List = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Item = styled.div`
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid;
`;

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
