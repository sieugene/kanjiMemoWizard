import { Button } from "@nextui-org/react";
import Image from "next/image";
import { FC, useEffect } from "react";
import styled from "styled-components";
import { AnimateType, useKanjiRender } from "../hooks/useKanjiRender";

type Props = {
  symbol: string;
  animated?: boolean;
  animateType?: AnimateType;
};
export const KanjiSvg: FC<Props> = ({
  symbol,
  animated,
  animateType = "svgClick",
}) => {
  const { init, html, kanjiUrl, buttonProps } = useKanjiRender({
    symbol,
    animateType,
  });

  useEffect(() => {
    if (html && animated) {
      init();
    }
  }, [html, animated]);

  return (
    <Root>
      {animated && html && <div dangerouslySetInnerHTML={{ __html: html }} />}
      {!animated && kanjiUrl && (
        <Image src={kanjiUrl} width={100} height={100} alt={symbol} />
      )}
      {animateType === "btnClick" && <Button {...buttonProps}>animate</Button>}
    </Root>
  );
};

const Root = styled.div`
  width: fit-content;
  svg {
    path {
      /* stroke: white; */
    }
    /* [id="kvg:07406-g1"] {
      path {
        stroke: purple;
      }
    }

    [id="kvg:07406-g2"] {
      path {
        stroke: red;
      }
    } */
  }
`;
