import { useKanjiList } from "@/features/kanjiList/hooks/useKanjiList";
import { Kanji } from "@/shared/data";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useMemo } from "react";
import { useSearchKanjiStore } from "../store";

function searchKanjiInArray(sentence: string, kanjiArray: Kanji[]): Kanji[] {
  const kanjiInSentence = sentence.match(/[\u4e00-\u9faf]/g);
  if (!kanjiInSentence) {
    return [];
  }
  const kanjiSet = new Set(kanjiArray.map((kanjiObj) => kanjiObj.kanji));
  const foundKanji: Kanji[] = [];
  kanjiInSentence.forEach((kanjiChar) => {
    if (kanjiSet.has(kanjiChar)) {
      const kanjiObject = kanjiArray.find(
        (kanjiObj) => kanjiObj.kanji === kanjiChar
      );
      if (kanjiObject) {
        foundKanji.push(kanjiObject);
      }
    }
  });
  return foundKanji;
}

export const useSearchKanji = () => {
  const { input, setInput } = useSearchKanjiStore();
  const debouncedInput = useDebounce<string>(input, 500);
  const list = useKanjiList();
  const applySearchFilter = useMemo(() => {
    return searchKanjiInArray(debouncedInput, list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput, list.length]);
  return {
    data: applySearchFilter,
    input,
    setInput,
    debouncedInput,
  };
};
