import { useFindKanji } from "@/features/kanjiList/hooks/useFindKanji";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { FC } from "react";
import styled from "styled-components";

import { KanjiSvg } from "@/features/KanjivgAnimate";
import { KanjiTree } from "../KanjiTree";
import { KanjiMnemonic } from "../KanjiMnemonic";
import { Hanzi } from "@/entities/HanziWriter";
import { KanjiSentences } from "../KanjiSentences";

type Props = {
  symbol: string;
};
export const KanjiDetails: FC<Props> = ({ symbol }) => {
  const kanji = useFindKanji(symbol);

  return (
    <Container>
      <Card className="py-4">
        <CardHeader>
          <DetailsHeader>
            <Chip color="warning" variant="bordered">
              N{kanji?.jlpt_new}
            </Chip>
            <Chip color="warning" variant="bordered">
              <h2>Stroke : {kanji?.strokes}</h2>
            </Chip>
          </DetailsHeader>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <BaseDetails>
            <KanjiSvg symbol={symbol} animated colorize />
            <Readings>
              <div className="details">
                <h2>ON: {kanji?.readings_on.map((a) => a)}</h2>
                <h2>KUN: {kanji?.readings_kun.map((a) => a)}</h2>
              </div>
            </Readings>
            <div className="parts">
              <h2> Parts: </h2>
              {kanji?.radicals.map((a, index) => (
                <p key={index}>{a}</p>
              ))}
            </div>
          </BaseDetails>

          <Meanings>
            <Chip variant="bordered">
              Meanings: {kanji?.meanings?.map((a) => ` ${a} ,`)}
            </Chip>
          </Meanings>
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
          <KanjiSentences symbol={symbol} />
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
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const DetailsHeader = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const BaseDetails = styled.div`
  display: flex;
  gap: 1rem;
`;
const Readings = styled.div``;

const Meanings = styled.div`
  margin-top: 1rem;
`;
