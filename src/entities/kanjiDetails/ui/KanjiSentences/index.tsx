import { FC } from "react";
import { useKanjiSentences } from "../../hooks/useKanjiSentences";
import { CircularProgress, ScrollShadow } from "@nextui-org/react";
import styled from "styled-components";

type Props = {
  symbol: string;
};
export const KanjiSentences: FC<Props> = ({ symbol }) => {
  const { isLoading, data } = useKanjiSentences({ symbol: symbol });

  return (
    <Root>
      {isLoading ? (
        <CircularProgress aria-label="Loading..." />
      ) : (
        <>
          <ScrollShadow className="w-[300px] h-[400px]">
            <ScrollBody>
              {data?.map((info) => (
                <div key={info.id}>
                  <h2>{info.sentence}</h2>
                  <h2>({info.translateLangName})</h2>
                  <h2>{info.translate}</h2>
                </div>
              ))}
            </ScrollBody>
          </ScrollShadow>
        </>
      )}
    </Root>
  );
};

const Root = styled.div``;

const ScrollBody = styled(ScrollShadow)`
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
