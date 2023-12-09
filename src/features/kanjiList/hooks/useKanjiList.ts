import { useState } from "react";
import { getKanjiList } from "../lib/getKanjiList";

export const useKanjiList = () => {
  const [list] = useState(getKanjiList());
  return list;
};
