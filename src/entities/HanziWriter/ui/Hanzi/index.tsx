/* eslint-disable no-unused-vars */
import { WriteGrid } from "@/shared/ui";
import { Button } from "@nextui-org/react";
import HanziWriter, { HanziWriterOptions } from "hanzi-writer";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { getHanziLoader } from "../../lib/getHanziLoader";
import { useHanziLoaderValidate } from "../../hooks/useHanziLoaderValidate";

type Props = {
  symbol: string;
};

const options: Partial<HanziWriterOptions> = {
  width: 100,
  height: 100,
  padding: 5,
  radicalColor: "#168F16", // green
  showOutline: false,
  strokeAnimationSpeed: 5,
  delayBetweenStrokes: 10,
};

function getHanziId(symbol: string) {
  return `character-target-div-${symbol}`;
}

export const Hanzi: FC<Props> = ({ symbol }) => {
  const { t } = useTranslation();

  const { data, isLoading } = useHanziLoaderValidate(symbol);
  const [_, setMode] = useState<"default" | "quiz">("default");
  const [isInited, setInit] = useState(false);
  const writer = useRef<HanziWriter | null>(null);
  const quizModeNotSupported = useMemo(() => {
    return !isLoading && !data;
  }, [data, isLoading]);

  useEffect(() => {
    if (!symbol || !!writer.current || !data) return;
    writer.current = HanziWriter?.create(getHanziId(symbol), symbol, {
      ...options,
      charDataLoader: getHanziLoader,
    });
    setInit(true);
  }, [symbol, data]);

  const quizMode = () => {
    if (!writer.current) return;
    writer.current._options = {
      ...writer.current._options,
      showCharacter: false,
      showOutline: false,
      showHintAfterMisses: 1,
      highlightOnComplete: false,
    };
    writer.current.quiz();
    setMode("quiz");
  };

  return (
    <Root>
      {quizModeNotSupported ? (
        <h2>{t("Quiz mode not supported")}</h2>
      ) : (
        <>
          <Grid>
            <WriteGrid className="write" />
          </Grid>
          <div
            id={getHanziId(symbol)}
            style={{ zIndex: 1, position: "relative" }}
          />
          {isInited && (
            <Actions>
              <Button onClick={quizMode}>{t("quiz")}</Button>
            </Actions>
          )}
        </>
      )}
    </Root>
  );
};

const Root = styled.div``;

const Grid = styled.div`
  background: white;
  width: 100px;
  height: 100px;
  z-index: 0;
  position: absolute;
`;

const Actions = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 14px;
`;
