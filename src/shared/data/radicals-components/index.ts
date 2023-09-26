import RADICALS_JSON from "./kanji2radical_left_right.json";
import KANJI_RADICALS from "./kanji2radical.json";
import KANJI_ELEMENTS from "./kanji2element.json";

export const RADICALS_COMPONENTS = {
  basePart: RADICALS_JSON,
  elements: KANJI_ELEMENTS,
  radicals: KANJI_RADICALS,
};

export type BASE_PART_KEY = keyof (typeof RADICALS_COMPONENTS)["basePart"];
export type RADICAL_ELEMENT_KEY =
  keyof (typeof RADICALS_COMPONENTS)["radicals"];
