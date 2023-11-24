import { FC } from "react";
import { useKanjiSentences } from "../../hooks/useKanjiSentences";
import { CircularProgress, ScrollShadow } from "@nextui-org/react";
import styled from "styled-components";
import ReactCountryFlag from "react-country-flag";
import { KanjiConverter } from "@/entities/KanjiConverter/ui";

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
                  <Item>
                    <ReactCountryFlag
                      countryCode="JP"
                      style={{
                        fontSize: "2em",
                      }}
                    />

                    <KanjiConverter
                      text={info.sentence}
                      showFurigana
                      asElement={<h2 />}
                    />
                  </Item>
                  <Item>
                    <ReactCountryFlag
                      countryCode="US"
                      style={{
                        fontSize: "2em",
                      }}
                    />
                    <h2>{info.translate}</h2>
                  </Item>
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

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
