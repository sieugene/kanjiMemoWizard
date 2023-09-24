import { Button } from "@nextui-org/react";
import Image from "next/image";
import { FC, useEffect } from "react";
import { AnimateType, useKanjivgLoad } from "../hooks/useKanjivgLoad";

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
  const { init, html, kanjiUrl, buttonProps } = useKanjivgLoad({
    symbol,
    animateType,
  });

  useEffect(() => {
    if (html && animated) {
      init();
    }
  }, [html, animated]);

  return (
    <div style={{ background: "white", width: "fit-content" }}>
      {animated && html && <div dangerouslySetInnerHTML={{ __html: html }} />}
      {!animated && kanjiUrl && (
        <Image src={kanjiUrl} width={100} height={100} alt={symbol} />
      )}
      {animateType === "btnClick" && <Button {...buttonProps}>animate</Button>}
    </div>
  );
};
