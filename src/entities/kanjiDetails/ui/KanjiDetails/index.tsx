import { useFindKanji } from "@/features/kanjiList/hooks/useFindKanji";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { FC } from "react";
import styled from "styled-components";

import { KanjiSvg } from "@/features/KanjivgAnimate";
import { KanjiTree } from "../KanjiTree";
import { KanjiMnemonic } from "../KanjiMnemonic";
import { Hanzi } from "@/entities/HanziWriter";
import { KanjiSentences } from "../KanjiSentences";
import { KanjiSteps } from "@/entities/KanjiSteps/ui";

type Props = {
  symbol: string;
};
export const KanjiDetails: FC<Props> = ({ symbol }) => {
  const kanji = useFindKanji(symbol);

  return (
    <Container>
      <Split>
        <MainInfo className="py-4">
          <CardHeader>
            <DetailsHeader>
              <Chip variant="bordered">N{kanji?.jlpt_new}</Chip>
              <Chip variant="bordered">
                <h2>Stroke : {kanji?.strokes}</h2>
              </Chip>
            </DetailsHeader>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <BaseDetails>
              <KanjiSvg symbol={symbol} animated colorize />
              <Meanings>
                <b>Meanings:</b>
                <p>
                  {kanji?.meanings?.map((a, index) => {
                    const prefix =
                      kanji.meanings.length === index + 1 ? "" : ",";
                    return ` ${a} ${prefix}`;
                  })}
                </p>
              </Meanings>
              <Readings>
                <div className="details">
                  <b>ON: </b>
                  <p>{kanji?.readings_on.map((a) => a)}</p>
                  <b>KUN: </b>
                  <p>{kanji?.readings_kun.map((a) => a)}</p>
                </div>
              </Readings>
              <Parts>
                <h2> Parts: </h2>
                {kanji?.radicals.map((a, index) => (
                  <p key={index}>{a}</p>
                ))}
              </Parts>
            </BaseDetails>
            <Steps>
              <KanjiSteps symbol={symbol} />
            </Steps>
          </CardBody>
        </MainInfo>
        <Mnemonics>
          <KanjiMnemonic symbol={symbol} />
        </Mnemonics>
      </Split>

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

const Split = styled.div`
  display: flex;
  gap: 1rem;
`;

const DetailsHeader = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const BaseDetails = styled.div`
  display: flex;
  gap: 1rem;
`;
const Steps = styled.div`
  margin-top: 1rem;
`;

const Readings = styled.div``;
const Parts = styled.div``;

const Meanings = styled.div`
  max-width: 170px;
`;

const MainInfo = styled(Card)`
  min-width: 45%;
  max-width: 60%;
`;

const Mnemonics = styled.div`
  width: 100%;
  /* max-width: 40%; */
`;
