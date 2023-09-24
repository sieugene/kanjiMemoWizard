function kanjiToHex(kanji: string) {
  const kcode = kanji?.codePointAt(0) || 0;
  let hex = kcode.toString(16);
  const zeros = 5 - hex.length;
  hex = "0".repeat(zeros) + hex;
  return hex;
}

export const getKanjiUrl = (symbol: string) => {
  return `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${kanjiToHex(
    symbol
  )}.svg`;
};
