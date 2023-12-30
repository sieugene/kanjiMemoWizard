import { useFindKanji } from "@/features/kanjiList/hooks/useFindKanji";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { FC } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "next-i18next";
import { Hanzi } from "@/entities/HanziWriter";
import { KanjiSteps } from "@/entities/KanjiSteps/ui";
import { KanjiSvg } from "@/features/KanjivgAnimate";
import { KanjiMnemonic } from "../KanjiMnemonic";
import { KanjiTree } from "../KanjiTree";
import { KanjiSentences } from "@/entities/KanjiSentences/ui";

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
          <Title>{t("Base Info")}</Title>
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
                <KanjiSvg
                  symbol={symbol}
                  animated
                  colorize
                  animateType="btnClick"
                />

                <Meanings>
                  <TitleCat>{t("Meanings")}:</TitleCat>
                  <List>
                    {kanji?.meanings?.map((a, index) => {
                      const prefix =
                        kanji.meanings.length === index + 1 ? "" : ",";
                      return <SmallText key={a}>{` ${a} ${prefix}`}</SmallText>;
                    })}
                  </List>
                </Meanings>
                <Readings>
                  <TitleCat>{t("ON:")} </TitleCat>
                  <List>
                    {kanji?.readings_on.map((a) => {
                      return <SmallText key={a}>{a}</SmallText>;
                    })}
                  </List>
                  <TitleCat>{t("KUN:")} </TitleCat>
                  <List>
                    {kanji?.readings_kun.map((a) => {
                      return <SmallText key={a}>{a}</SmallText>;
                    })}
                  </List>
                </Readings>
                <Parts>
                  <TitleCat> {t("Parts:")} </TitleCat>
                  <List>
                    {kanji?.radicals?.map((a, index) => (
                      <SmallText key={index}>{a}</SmallText>
                    ))}
                  </List>
                </Parts>
              </BaseDetails>
              <Steps>
                <KanjiSteps symbol={symbol} />
              </Steps>
            </CardBody>
          </Card>
        </MainInfo>

        <Mnemonics>
          <Title>{t("Mnemonics")}</Title>
          <KanjiMnemonic symbol={symbol} />
        </Mnemonics>
      </Split>

      <Title>{t("Kanji Tree")}</Title>
      <Card>
        <CardBody>
          <KanjiTree symbol={symbol} />
        </CardBody>
      </Card>

      <Title>{t("Sentences")}</Title>

      <Card>
        <CardHeader className="flex gap-3">
          <KanjiSentences.Controls symbol={symbol} />
        </CardHeader>
        <CardBody>
          <KanjiSentences symbol={symbol} />
        </CardBody>
      </Card>

      <Title>{t("Try writing")}</Title>

      <Card>
        <CardBody>
          <Hanzi symbol={symbol} size={300} />
        </CardBody>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const Title = styled.h2`
  margin: 15px 0px;
`;

const Split = styled.div`
  display: flex;
  gap: 1rem;
  height: 100%;
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
  flex-wrap: wrap;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
`;

const TitleCat = styled.h3`
  margin: 5px 0px;
`;
const SmallText = styled.p`
  font-weight: 300;
  line-height: 15px;
  font-size: 14px;
  ${({ theme }) => theme.fonts.base.config.style};
  color: ${({ theme }) => theme.colors.silver};
`;
const Steps = styled.div`
  margin-top: 1rem;
`;

const Readings = styled.div`
  ${({ theme }) => css`
    ${theme.breakpoints.lessThan("sm")} {
      max-width: 100%;
      width: 100%;
    }
  `}
`;
const Parts = styled.div`
  ${({ theme }) => css`
    ${theme.breakpoints.lessThan("sm")} {
      max-width: 100%;
      width: 100%;
    }
  `}
`;

const Meanings = styled.div`
  max-width: 170px;
  ${({ theme }) => css`
    ${theme.breakpoints.lessThan("sm")} {
      max-width: 100%;
      width: 100%;
    }
  `}
`;

const MainInfo = styled.div`
  min-width: 45%;
  max-width: 60%;
  height: auto;
  display: flex;
  flex-direction: column;
  ${({ theme }) => css`
    ${theme.breakpoints.lessThan("xl")} {
      max-width: 100%;
      width: 100%;
    }
  `}
`;

const Mnemonics = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
