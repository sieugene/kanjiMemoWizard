/* eslint-disable no-unused-vars */
import { WriteGrid } from "@/shared/ui";
import { Button } from "@nextui-org/react";
import HanziWriter, { HanziWriterOptions } from "hanzi-writer";
import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";

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

export const Hanzi: FC<Props> = ({ symbol }) => {
  const [mode, setMode] = useState<"default" | "quiz">("default");
  const writer = useRef<HanziWriter | null>(null);
  useEffect(() => {
    if (!symbol) return;

    writer.current = HanziWriter?.create("character-target-div", symbol, {
      ...options,
      charDataLoader: (char, onLoad, onError) => {
        fetch(
          `https://cdn.jsdelivr.net/npm/hanzi-writer-data-jp@0/${char}.json`
        )
          .then((res) => res.json())
          .then(onLoad)
          .catch(onError);
      },
    });
  }, [symbol]);

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
      <Grid>
        <WriteGrid className="write" />
      </Grid>
      <div
        id="character-target-div"
        style={{ zIndex: 1, position: "relative" }}
      />
      <Actions>
        <Button onClick={quizMode}>quiz</Button>
      </Actions>
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
