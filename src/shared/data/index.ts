import KANJI_JSON from "./kanji.json";

export const JLPT_LEVELS = 5;
export type Kanji = {
  strokes: number;
  grade: number;
  freq: number;
  jlpt_old: number;
  jlpt_new: number;
  meanings: string[];
  readings_on: string[];
  readings_kun: string[];
  wk_level: number;
  wk_meanings: string[];
  wk_readings_on: string[];
  wk_readings_kun: string[];
  wk_radicals: string[];
  kanji: string;
};

export const KANJI_OBJ = KANJI_JSON;
export const KANJI_LIST: Kanji[] = Object.keys(KANJI_OBJ).map((kanji) => {
  const data: (typeof KANJI_OBJ)["一"] = (KANJI_OBJ as any)[kanji];
  const nextData: Kanji = {
    kanji,
    ...data,
  };
  return nextData;
});
