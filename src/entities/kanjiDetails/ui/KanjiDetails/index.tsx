import { useFindKanji } from "@/features/kanjiList/hooks/useFindKanji";
import { Chip, CircularProgress } from "@nextui-org/react";
import { FC } from "react";
import styled from "styled-components";
import { useMnemonic } from "../../hooks/useMnemonic";

import { Hanzi } from "@/entities/HanziWriter";
import { KanjiSvg } from "@/features/KanjivgAnimate";
import { KanjiTree } from "../KanjiTree";

type Props = {
  symbol: string;
};
export const KanjiDetails: FC<Props> = ({ symbol }) => {
  const kanji = useFindKanji(symbol);
  const { data: mnemonicData, isLoading } = useMnemonic(symbol);

  return (
    <Container>
      <KanjiSvg symbol={symbol} animated />
      <Hanzi symbol={symbol} />

      <Chip color="default">N{kanji?.jlpt_new}</Chip>
      <Chip color="default">Strokes {kanji?.strokes}</Chip>

      {kanji?.kanji}
      <h2>Mnemonic</h2>
      {isLoading ? (
        <CircularProgress aria-label="Loading..." />
      ) : (
        <Mnemonic>
          {mnemonicData?.map((data, index) => (
            <div key={index}>
              <h3>
                <a href={data.source}>Source link</a>
              </h3>
              <h2>Story - {data.mnemonic}</h2>
            </div>
          ))}
        </Mnemonic>
      )}
      <h2>Level - {kanji?.jlpt_new}</h2>
      <h2>Readings</h2>
      <p>kun: {kanji?.readings_kun}</p>
      <p>on: {kanji?.readings_on}</p>
      <h2>Meanings</h2>
      {kanji?.meanings?.map((meaning, index) => (
        <p key={index}>{meaning}</p>
      ))}
      <hr />

      <KanjiTree symbol={symbol} />
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
`;

const Mnemonic = styled.div`
  border: 1px solid white;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
