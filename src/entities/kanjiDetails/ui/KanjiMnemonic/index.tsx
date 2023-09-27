import { Card, CardBody, CircularProgress, Tab, Tabs } from "@nextui-org/react";
import { useMnemonic } from "../../hooks/useMnemonic";
import { FC } from "react";
import styled from "styled-components";

type Props = {
  symbol: string;
};
export const KanjiMnemonic: FC<Props> = ({ symbol }) => {
  const { data: mnemonicData, isLoading } = useMnemonic(symbol);

  return (
    <Root className="flex w-full flex-col">
      {isLoading ? (
        <CircularProgress aria-label="Loading..." />
      ) : (
        <Tabs aria-label="Mnemonics">
          {mnemonicData?.map((data) => (
            <Tab key={data.service} title={data.service}>
              <Card>
                <CardBody>
                  <h3>
                    <a href={data.source}>Source link</a>
                  </h3>
                  <Text>{data.mnemonic}</Text>
                </CardBody>
              </Card>
            </Tab>
          ))}
        </Tabs>
      )}
    </Root>
  );
};

const Root = styled.div``;

const Text = styled.p`
  white-space: pre-wrap;
`;
