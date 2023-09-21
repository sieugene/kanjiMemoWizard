import { useKanjiList } from "./useKanjiList";

export const useFindKanji = (symbol: string) => {
  const list = useKanjiList();
  return list.find((a) => a.kanji === symbol);
};
