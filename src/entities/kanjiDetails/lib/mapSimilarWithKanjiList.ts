import { Kanji } from "@/shared/data";
import { SimilarPair } from "../model/SearchSimilarKanji";
import { RecommendationKanji } from "../types";

export const mapSimilarWithKanjiList = (
  pair: SimilarPair,
  list: Kanji[]
): RecommendationKanji[] => {
  return pair.map((symbol) => {
    const data = list.find((kanji) => kanji.kanji === symbol);
    return {
      data,
      kanji: symbol,
      hasLink: !!data,
    };
  });
};
