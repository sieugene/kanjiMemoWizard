import { Kanji } from "@/shared/data";
import { ROUTES } from "@/shared/routes";
import { Card, CardFooter } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

type Props = {
  kanji: Kanji;
};

export const KanjiItem = React.memo(({ kanji }: Props) => {
  const symbolKanji = kanji?.kanji;
  return (
    <Link href={ROUTES.kanji(kanji.kanji)}>
      <CardItem isFooterBlurred radius="lg" className="border-none">
        <Text> {symbolKanji}</Text>
        <Footer className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <Reading>
            {kanji?.readings_on?.slice(0, 2).map((reading) => (
              <p
                key={`${symbolKanji}-${reading}`}
                className="text-tiny text-white/60"
              >
                {reading}
              </p>
            ))}
          </Reading>
          <div>
            <p>{kanji?.meanings[0]}</p>
          </div>
        </Footer>
      </CardItem>
    </Link>
  );
});

KanjiItem.displayName = "KanjiItem";

const CardItem = styled(Card)`
  align-items: center;
  padding: 10px;
  min-width: 150px;
  max-width: 150px;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
`;

const Footer = styled(CardFooter)`
  bottom: 1rem;
  display: flex;
  padding: 10px;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`;

const Reading = styled.div`
  p {
    font-weight: 300;
    color: #9b9b9b;
  }
`;

const Text = styled.p`
  font-size: 5.5rem;
`;
