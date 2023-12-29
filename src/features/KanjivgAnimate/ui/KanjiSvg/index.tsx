import { Button } from "@nextui-org/react";
import Image from "next/image";
import { FC, useEffect } from "react";
import styled, { css } from "styled-components";
import { useKanjiRender } from "../../hooks/useKanjiRender";
import { AnimateType } from "../../model/KanjiAnimate";
import { useTranslation } from "react-i18next";

type Props = {
  symbol: string;
  animated?: boolean;
  animateType?: AnimateType;
  colorize?: boolean;
};
export const KanjiSvg: FC<Props> = ({
  symbol,
  animated,
  animateType = "svgClick",
  colorize = false,
}) => {
  const { t } = useTranslation();
  const { init, html, kanjiUrl, buttonProps } = useKanjiRender({
    symbol,
    animateType,
    colorize,
  });

  useEffect(() => {
    if (html && animated) {
      init();
    }
  }, [html, animated]);

  return (
    <Root>
      {animated && html && (
        <HtmlSvg
          dangerouslySetInnerHTML={{ __html: html }}
          animateType={animateType}
        />
      )}
      {!animated && kanjiUrl && (
        <Image src={kanjiUrl} width={100} height={100} alt={symbol} />
      )}
      {animateType === "btnClick" && (
        <Button {...buttonProps}>{t("animate")}</Button>
      )}
    </Root>
  );
};

const Root = styled.div`
  width: fit-content;
`;

const HtmlSvg = styled.div<Pick<Props, "animateType">>`
  ${(props) =>
    props?.animateType === "svgClick" &&
    css`
      cursor: pointer;
    `}
`;
