/* eslint-disable react-hooks/rules-of-hooks */
import { useKanjiSentences } from "../../hooks/useKanjiSentences";
import { CircularProgress, ScrollShadow, Switch } from "@nextui-org/react";
import styled from "styled-components";
import ReactCountryFlag from "react-country-flag";
import { KanjiConverter } from "@/entities/KanjiConverter/ui";
import { FC } from "react";
import { useKanjiSentencesStore } from "../../store";
import { useTranslation } from "react-i18next";

type Props = {
  symbol: string;
};
type ReactSubcomponent = FC<Props> & {
  Controls: FC<Props>;
};
export const KanjiSentences: ReactSubcomponent = ({ symbol }) => {
  const { isLoading, data } = useKanjiSentences({ symbol: symbol });
  const { showFurigana } = useKanjiSentencesStore();

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
                      showFurigana={showFurigana}
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

KanjiSentences.Controls = () => {
  const { toggleShowFurigana, showFurigana } = useKanjiSentencesStore();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <Switch isSelected={showFurigana} onValueChange={toggleShowFurigana}>
        {t("Show furigana")}
      </Switch>
    </div>
  );
};
KanjiSentences.Controls.displayName = "Controls";

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
