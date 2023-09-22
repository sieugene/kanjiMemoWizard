import { JLPT_LEVELS, Kanji } from "@/shared/data";

export const sortByLevel = (list: Kanji[]) => {
  return Array.from(Array(JLPT_LEVELS).keys())
    .map((_, index) => {
      const level = index + 1;
      const byGrade = list.filter((list) => list.jlpt_new === level);

      return { level, list: byGrade };
    })
    .sort((a, b) => b.level - a.level);
};
