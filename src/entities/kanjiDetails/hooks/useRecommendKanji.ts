import { useMemo } from "react";
import { SearchSimilarKanji } from "../model/SearchSimilarKanji";
import { useKanjiList } from "@/features/kanjiList/hooks/useKanjiList";
import { mapSimilarWithKanjiList } from "../lib/mapSimilarWithKanjiList";
import { RecommendationKanji } from "../types";

export const useRecommendKanji = (query: string) => {
  const list = useKanjiList();
  return useMemo<RecommendationKanji[]>(() => {
    if (list.length) {
      return mapSimilarWithKanjiList(SearchSimilarKanji.search(query), list);
    }
    return [];
  }, [query, list]);
};
