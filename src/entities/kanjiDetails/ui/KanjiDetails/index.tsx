import { useFindKanji } from "@/features/kanjiList/hooks/useFindKanji";
import { FC } from "react";
import { useMnemonic } from "../../hooks/useMnemonic";
import { CircularProgress } from "@nextui-org/react";
import styled from "styled-components";
import { useRadicalsTree } from "../../hooks/useRadicalsTree";

type Props = {
  symbol: string;
};
export const KanjiDetails: FC<Props> = ({ symbol }) => {
  const kanji = useFindKanji(symbol);
  const { data: mnemonicData, isLoading } = useMnemonic(symbol);
  const tree = useRadicalsTree(symbol);
  return (
    <div>
      {kanji?.kanji}
      <h2>Mnemonic</h2>
      {isLoading ? (
        <CircularProgress aria-label="Loading..." />
      ) : (
        <Mnemonic>
          {mnemonicData?.map((data, index) => (
            <div key={index}>
              <h3>
                <a href={data.source}>Source link</a>
              </h3>
              <h2>Story - {data.mnemonic}</h2>
            </div>
          ))}
        </Mnemonic>
      )}
      <h2>Level - {kanji?.jlpt_new}</h2>
      <h2>Readings</h2>
      <p>kun: {kanji?.readings_kun}</p>
      <p>on: {kanji?.readings_on}</p>
      <h2>Meanings</h2>
      {kanji?.meanings?.map((meaning, index) => (
        <p key={index}>{meaning}</p>
      ))}
      <hr />

      <Tree>
        {tree?.map((radical) => (
          <div key={radical?.element}>
            <p>{radical?.element}</p>
            <h1>deep</h1>
            {radical?.deep?.length
              ? radical?.deep?.map((e) => <p key={e}>{e}</p>)
              : "not"}
          </div>
        ))}
      </Tree>
    </div>
  );
};

const Mnemonic = styled.div`
  border: 1px solid white;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Tree = styled.div`
  display: flex;
  gap: 11px;
`;
