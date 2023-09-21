import { KANJI_LIST } from "@/shared/data";
import { useState } from "react";

export const useKanjiList = () => {
  const [list] = useState(KANJI_LIST);
  return list;
};
