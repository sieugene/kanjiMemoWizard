import { useEvent } from "@/shared/hooks";
import KanjivgAnimate from "kanjivganimate";
import { useRef } from "react";
import useSWR from "swr";
import { useKanjiSvgData } from "./useKanjiSvgData";

export type AnimateType = "svgClick" | "btnClick";

type BtnArgs = {
  "data-kanjivg-target": string;
  className: string;
};

type Options = {
  symbol: string;
  animateType: AnimateType;
  colorize?: boolean;
};

export const useKanjiRender = ({ symbol, animateType, colorize }: Options) => {
  const className = useRef("");
  const btnArgs = useRef<BtnArgs | null>(null);
  const kanjiSvg = useKanjiSvgData(symbol, animateType);

  const { data } = useSWR(
    !!kanjiSvg?.data && `kanji-image-attach/${symbol}`,
    async () => {
      const result = kanjiSvg.data!!.attach(colorize);
      className.current = result.className;
      btnArgs.current = result.buttonArguments;
      return result.html;
    }
  );

  const init = useEvent(() => {
    if (className.current) {
      if (animateType === "btnClick") {
        new KanjivgAnimate(`.${btnArgs.current?.className}`, 500);
      } else {
        // TODO Need class with custom rerender
        // const elements = document.getElementsByClassName(className.current);
        // elements[0].addEventListener("click", (event) => {
        //   new KanjivgAnimate(`.${className.current}`, 500);
        // });

        new KanjivgAnimate(`.${className.current}`, 500);
      }
    }
  });

  return {
    init,
    html: data,
    kanjiUrl: data ? kanjiSvg?.data?.kanjiUrl : null,
    buttonProps: animateType === "btnClick" ? btnArgs.current : {},
  };
};

export type UseKanjiRenderT = ReturnType<typeof useKanjiRender>;
