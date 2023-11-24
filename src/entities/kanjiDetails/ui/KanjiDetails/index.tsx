import { useFindKanji } from "@/features/kanjiList/hooks/useFindKanji";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { FC } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "next-i18next";
import { Hanzi } from "@/entities/HanziWriter";
import { KanjiSteps } from "@/entities/KanjiSteps/ui";
import { KanjiSvg } from "@/features/KanjivgAnimate";
import { KanjiMnemonic } from "../KanjiMnemonic";
import { KanjiSentences } from "../KanjiSentences";
import { KanjiTree } from "../KanjiTree";

type Props = {
  symbol: string;
};
export const KanjiDetails: FC<Props> = ({ symbol }) => {
  const { t } = useTranslation();
  const kanji = useFindKanji(symbol);

  return (
    <Container>
      <Split>
        <MainInfo>
          <h2>Base Info</h2>
          <Card style={{ height: "100%" }}>
            <CardHeader>
              <DetailsHeader>
                <Chip variant="bordered">N{kanji?.jlpt_new}</Chip>
                <Chip variant="bordered">
                  <h2>Stroke : {kanji?.strokes}</h2>
                </Chip>
              </DetailsHeader>
            </CardHeader>
            <CardBody
              className="overflow-visible py-2"
              style={{ height: "100%" }}
            >
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
                    <h3>{t("ON:")} </h3>
                    <p>{kanji?.readings_on.map((a) => a)}</p>
                    <h3>{t("KUN:")} </h3>
                    <p>{kanji?.readings_kun.map((a) => a)}</p>
                  </div>
                </Readings>
                <Parts>
                  <h2> {t("Parts:")} </h2>
                  {kanji?.radicals?.map((a, index) => (
                    <p key={index}>{a}</p>
                  ))}
                </Parts>
              </BaseDetails>
              <Steps>
                <KanjiSteps symbol={symbol} />
              </Steps>
            </CardBody>
          </Card>
        </MainInfo>

        <Mnemonics>
          <h2>{t("Mnemonics")}</h2>
          <KanjiMnemonic symbol={symbol} />
        </Mnemonics>
      </Split>

      <h2>{t("Kanji Tree")}</h2>
      <Card>
        <CardBody>
          <KanjiTree symbol={symbol} />
        </CardBody>
      </Card>

      <h2>{t("Sentences")}</h2>

      <Card>
        <CardBody>
          <KanjiSentences symbol={symbol} />
        </CardBody>
      </Card>

      <h2>{t("Try writing")}</h2>

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
  ${({ theme }) => css`
    ${theme.breakpoints.lessThan("xl")} {
      flex-direction: column;
    }
  `}
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

const Readings = styled.div`
  .details {
    h3 {
      margin-bottom: 5px;
    }
  }
`;
const Parts = styled.div``;

const Meanings = styled.div`
  max-width: 170px;
`;

const MainInfo = styled.div`
  min-width: 45%;
  max-width: 60%;
  ${({ theme }) => css`
    ${theme.breakpoints.lessThan("xl")} {
      max-width: 100%;
      width: 100%;
    }
  `}
`;

const Mnemonics = styled.div`
  width: 100%;
`;
