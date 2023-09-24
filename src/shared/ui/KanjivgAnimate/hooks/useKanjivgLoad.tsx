import { useEvent } from "@/shared/hooks";
import axios from "axios";
import * as cheerio from "cheerio";
import KanjivgAnimate from "kanjivganimate";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import { getKanjiUrl } from "../lib/getKanjiUrl";
import { useMemo, useRef } from "react";
import { parseElements } from "../lib/parseElements";

export type AnimateType = "svgClick" | "btnClick";

type BtnArgs = {
  "data-kanjivg-target": string;
  className: string;
};

type Options = {
  symbol: string;
  animateType: AnimateType;
};

const colors = ["#FF0000", "#00FF00", "#0000FF"];

export const useKanjivgLoad = ({ symbol, animateType }: Options) => {
  const kanjiUrl = useMemo(() => getKanjiUrl(symbol), [symbol]);
  const className = useRef("");
  const btnArgs = useRef<BtnArgs | null>(null);

  const { data } = useSWR(symbol && `kanji-image/${symbol}`, async () => {
    try {
      const response = await axios.get<string>(kanjiUrl);
      const $ = cheerio.load(response.data);
      const svg = $("svg");
      // ---
      const elements = parseElements($);

      Object.values(elements).map((a, index) => {
        const partElement = $(`[kvg\\:element="${a.main}"]`);
        const color = colors[index % colors.length] || "white";
        partElement.find("path").attr("stroke", color);
      });
      // -----
      const uniqueClassname = `id-${uuidv4()}-${symbol}`;

      className.current = uniqueClassname;
      svg.attr("class", className.current);

      if (animateType === "btnClick") {
        const uniqueAnimateId = `animate-${uniqueClassname}`;
        const uniqueAnimateBtnTrigger = `trigger-${uniqueClassname}`;
        btnArgs.current = {
          "data-kanjivg-target": `#${uniqueAnimateId}`,
          className: uniqueAnimateBtnTrigger,
        };
        svg.attr("id", uniqueAnimateId);
      }

      return svg.toString();
    } catch (error) {
      return null;
    }
  });

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
    kanjiUrl: data ? kanjiUrl : null,
    buttonProps: animateType === "btnClick" ? btnArgs.current : {},
  };
};
