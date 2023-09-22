import { useFindKanji } from "@/features/kanjiList/hooks/useFindKanji";
import { FC } from "react";
import { useMnemonic } from "../../hooks/useMnemonic";
import { CircularProgress } from "@nextui-org/react";

type Props = {
  symbol: string;
};
export const KanjiDetails: FC<Props> = ({ symbol }) => {
  const kanji = useFindKanji(symbol);
  const { data: mnemonicData, isLoading } = useMnemonic(symbol);
  return (
    <div>
      {kanji?.kanji}
      <h2>Mnemonic</h2>
      {isLoading ? (
        <CircularProgress aria-label="Loading..." />
      ) : (
        <>
          <p>{mnemonicData?.mnemonic}</p>
          <h3>
            <a href={mnemonicData?.source}>source</a>
          </h3>
        </>
      )}
      <h2>Level - {kanji?.jlpt_new}</h2>
      <h2>Readings</h2>
      <p>kun: {kanji?.readings_kun}</p>
      <p>on: {kanji?.readings_on}</p>
      <h2>Meanings</h2>
      {kanji?.meanings?.map((meaning, index) => (
        <p key={index}>{meaning}</p>
      ))}
    </div>
  );
};
