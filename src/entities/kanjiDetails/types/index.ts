import { Kanji } from "@/shared/data";

export type RecommendationKanji = {
  data: Kanji | undefined;
  kanji: string;
  hasLink: boolean;
};
