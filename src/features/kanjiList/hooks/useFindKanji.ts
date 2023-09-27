import { useMemo } from "react";
import { useKanjiList } from "./useKanjiList";
import {
  RADICALS_COMPONENTS,
  RADICAL_ELEMENT_KEY,
} from "@/shared/data/radicals-components";
import { Kanji } from "@/shared/data";

type FindKanji = Kanji & { radicals: string[] };

export const useFindKanji = (symbol: string) => {
  const list = useKanjiList();
  const kanji = list.find((a) => a.kanji === symbol);
  return useMemo<FindKanji | null>(() => {
    if (!kanji) return null;
    return {
      ...kanji,
      radicals:
        RADICALS_COMPONENTS.radicals[kanji.kanji as RADICAL_ELEMENT_KEY],
    };
  }, [kanji]);
};
