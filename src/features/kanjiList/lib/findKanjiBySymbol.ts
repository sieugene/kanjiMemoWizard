import { getKanjiList } from "./getKanjiList";

export const findKanjiBySymbol = (symbol: string) => {
  const list = getKanjiList();
  const exist = list.find((a) => a.kanji === symbol);
  return exist;
};
