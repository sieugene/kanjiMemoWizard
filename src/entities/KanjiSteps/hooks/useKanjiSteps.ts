import { useKanjiSvgData } from "@/features/KanjivgAnimate/hooks";
import useSWR from "swr";

type Options = {
  symbol: string;
};

export const useKanjiSteps = ({ symbol }: Options) => {
  const kanjiSvg = useKanjiSvgData(symbol, "svgClick");

  const { data } = useSWR(
    !!kanjiSvg?.data && `kanji-steps/${symbol}`,
    async () => {
      const result = kanjiSvg.data!!.generateStepByStep();
      return result;
    }
  );

  return data;
};
