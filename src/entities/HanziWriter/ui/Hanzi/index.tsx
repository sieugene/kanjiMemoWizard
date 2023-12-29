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
  size: number;
};

const options: Partial<HanziWriterOptions> = {
  padding: 5,
  radicalColor: "#168F16", // green
  showOutline: false,
  strokeAnimationSpeed: 5,
  delayBetweenStrokes: 10,
  drawingWidth: 30,
};

function getHanziId(symbol: string, size: number) {
  return `character-target-div-${symbol}-${size}`;
}

export const Hanzi: FC<Props> = ({ symbol, size }) => {
  const { t } = useTranslation();

  const { data, isLoading } = useHanziLoaderValidate(symbol);
  const [_, setMode] = useState<"default" | "quiz">("default");

  const writer = useRef<HanziWriter | null>(null);
  const quizModeNotSupported = useMemo(() => {
    return !isLoading && !data;
  }, [data, isLoading]);

  useEffect(() => {
    if (!symbol || writer?.current?._char === symbol || !data) return;
    writer.current = HanziWriter?.create(getHanziId(symbol, size), symbol, {
      ...options,
      charDataLoader: getHanziLoader,
      height: size,
      width: size,
    });
  }, [symbol, data, size]);

  const quizMode = () => {
    if (!writer.current) return;
    writer.current._options = {
      ...writer.current._options,
      showCharacter: false,
      showHintAfterMisses: 1,
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
          <Grid gridSize={size}>
            <WriteGrid className="write" size={size} />
          </Grid>
          <div
            key={getHanziId(symbol, size)}
            id={getHanziId(symbol, size)}
            style={{ zIndex: 1, position: "relative" }}
          />
          <Actions>
            <Button onClick={quizMode}>{t("quiz")}</Button>
          </Actions>
        </>
      )}
    </Root>
  );
};

const Root = styled.div``;

const Grid = styled.div<{ gridSize: number }>`
  background: white;
  width: ${({ gridSize }) => `${gridSize}px`};
  height: ${({ gridSize }) => `${gridSize}px`};
  z-index: 0;
  position: absolute;
`;

const Actions = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 14px;
`;
