import {
  Card,
  CardBody,
  CircularProgress,
  ScrollShadow,
  Snippet,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useMnemonic } from "../../hooks/useMnemonic";
import { FC } from "react";
import styled from "styled-components";

type Props = {
  symbol: string;
};
export const KanjiMnemonic: FC<Props> = ({ symbol }) => {
  const { data: mnemonicData, isLoading } = useMnemonic(symbol);

  return (
    <Root>
      {isLoading ? (
        <CircularProgress aria-label="Loading..." />
      ) : (
        <Content>
          <Tabs aria-label="Mnemonics" style={{ display: "block" }}>
            {mnemonicData?.map((data) => (
              <Tab key={data?.service} title={data?.service}>
                <Card>
                  <CardBody>
                    <ScrollShadow>
                      <ScrollBody>
                        <h3 style={{ marginBottom: 10 }}>
                          <a href={data?.source}>Source link</a>
                        </h3>
                        <Snippet symbol="" variant="bordered">
                          <Text>{data?.mnemonic}</Text>
                        </Snippet>
                      </ScrollBody>
                    </ScrollShadow>
                  </CardBody>
                </Card>
              </Tab>
            ))}
          </Tabs>
        </Content>
      )}
    </Root>
  );
};

const Root = styled.div`
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > div:nth-child(2) {
    padding: 0;
    padding-top: 1rem;
    height: inherit;
    & > div:nth-child(1) {
      height: inherit;
    }
  }
  height: 100%;
`;

const Text = styled.p`
  white-space: pre-wrap;
`;

const ScrollBody = styled.div`
  height: 250px;
`;
