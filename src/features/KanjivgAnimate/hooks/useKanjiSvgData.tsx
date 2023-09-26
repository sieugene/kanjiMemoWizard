import useSWR from "swr";
import { KanjiAnimate } from "../model/KanjiAnimate";
import { AnimateType } from "./useKanjiRender";

export const useKanjiSvgData = (symbol: string, animateType: AnimateType) => {
  return useSWR(symbol && `kanji-svg-data/${symbol}`, async () => {
    const api = new KanjiAnimate(symbol, animateType);
    await api.install();
    return api;
  });
};
