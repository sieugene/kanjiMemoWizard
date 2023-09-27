import { useFindKanji } from "@/features/kanjiList/hooks/useFindKanji";
import { Card, CardBody, Chip } from "@nextui-org/react";
import { FC } from "react";
import styled from "styled-components";

import { KanjiSvg } from "@/features/KanjivgAnimate";
import { KanjiTree } from "../KanjiTree";
import { KanjiMnemonic } from "../KanjiMnemonic";
import { Hanzi } from "@/entities/HanziWriter";

type Props = {
  symbol: string;
};
export const KanjiDetails: FC<Props> = ({ symbol }) => {
  const kanji = useFindKanji(symbol);

  return (
    <Container>
      {/* <Hanzi symbol={symbol} />

      <Chip color="default">N{kanji?.jlpt_new}</Chip>
      <Chip color="default">Strokes {kanji?.strokes}</Chip> */}
      <Card className="py-4">
        <CardBody className="overflow-visible py-2">
          <div className="details">
            <Chip color="warning" variant="bordered">
              N{kanji?.jlpt_new}
            </Chip>
            <Chip color="warning" variant="bordered">
              <h2>Stroke : {kanji?.strokes}</h2>
            </Chip>
          </div>
          <KanjiSvg symbol={symbol} animated colorize />
          <div className="details">
            <h2>ON: {kanji?.readings_on.map((a) => a)}</h2>
            <h2>KUN: {kanji?.readings_kun.map((a) => a)}</h2>
          </div>
          <div className="details">
            Meanings: {kanji?.meanings?.map((a) => ` ${a} ;`)}
          </div>
        </CardBody>
      </Card>
      <KanjiMnemonic symbol={symbol} />

      <Card>
        <CardBody>
          <KanjiTree symbol={symbol} />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Hanzi symbol={symbol} />
        </CardBody>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 2rem;
`;
