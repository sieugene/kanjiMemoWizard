import { Button } from "@nextui-org/react";
import HanziWriter, { HanziWriterOptions } from "hanzi-writer";
import { FC, useEffect, useRef, useState } from "react";

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
    // writer.current =

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
    <div>
      <Grid id="character-target-div" mode={mode}></Grid>
      <Button onClick={() => writer.current?.animateCharacter()}>
        animate
      </Button>
      <Button onClick={quizMode}>quiz</Button>
    </div>
  );
};

const Grid = ({ id, mode }: { id: string; mode: "default" | "quiz" }) => {
  return (
    <div style={{ background: "white", width: "fit-content" }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" id={id}>
        {mode === "quiz" && (
          <>
            <line x1="0" y1="0" x2="100" y2="100" stroke="#DDD" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="#DDD" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="#DDD" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#DDD" />
          </>
        )}
      </svg>
    </div>
  );
};
