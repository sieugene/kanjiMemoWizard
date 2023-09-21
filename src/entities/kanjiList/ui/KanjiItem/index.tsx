import { Kanji } from "@/shared/data";
import { Card, CardFooter } from "@nextui-org/react";
import React from "react";
import styled from "styled-components";

type Props = {
  kanji: Kanji;
};

export const KanjiItem = React.memo(({ kanji }: Props) => {
  const symbolKanji = kanji?.kanji;
  return (
    <CardItem isFooterBlurred radius="lg" className="border-none">
      <Text> {symbolKanji}</Text>
      <Footer className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div>
          {kanji?.readings_on?.slice(0, 2).map((reading) => (
            <p
              key={`${symbolKanji}-${reading}`}
              className="text-tiny text-white/60"
            >
              {reading}
            </p>
          ))}
        </div>
        <div>
          <p>{kanji?.meanings[0]}</p>
        </div>
      </Footer>
    </CardItem>
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
`;

const Footer = styled(CardFooter)`
  bottom: 1rem;
  display: flex;
  padding: 10px;
  width: 100%;
  justify-content: space-between;
`;

const Text = styled.p`
  font-size: 5.5rem;
`;
