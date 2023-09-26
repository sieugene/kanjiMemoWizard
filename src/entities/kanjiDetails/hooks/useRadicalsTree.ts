import { useKanjiSvgData } from "@/features/KanjivgAnimate/hooks";
import { useMemo } from "react";

export const useRadicalsTree = (symbol: string) => {
  // const [data] = useState(RADICALS_COMPONENTS);
  const { data: dataBySvg } = useKanjiSvgData(symbol, "svgClick");
  const tree = useMemo(() => dataBySvg?.getRadicalParts(), [dataBySvg]);

  return {
    symbol,
    // tree: data.radicals[symbol as RADICAL_ELEMENT_KEY],
    tree,
  };
};
