import KANJI_JSON from "./kanji.json";
type Kanji = {
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
};

export const KANJI_OBJ = KANJI_JSON;
export const KANJI_LIST = Object.keys(KANJI_OBJ).map((kanji) => {
  const data: Kanji = (KANJI_OBJ as any)[kanji];
  return {
    kanji,
    ...data,
  };
});
