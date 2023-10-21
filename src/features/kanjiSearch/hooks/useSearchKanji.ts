import { useKanjiList } from "@/features/kanjiList/hooks/useKanjiList";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useMemo, useState } from "react";

export const useSearchKanji = () => {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce<string>(input, 500);
  const list = useKanjiList();
  const applySearchFilter = useMemo(() => {
    const data = list.filter((data) => {
      return (
        data.kanji.includes(debouncedInput) ||
        data.meanings?.[0]
          ?.toLocaleLowerCase()
          .includes(debouncedInput?.toLocaleLowerCase())
      );
    });
    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);
  return {
    data: applySearchFilter,
    input,
    setInput,
    debouncedInput,
  };
};
