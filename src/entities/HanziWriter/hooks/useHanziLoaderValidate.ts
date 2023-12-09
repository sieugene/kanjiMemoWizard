import { HANZI_API } from "@/shared/api/hanzi";
import { HanziDataResponse } from "@/shared/api/hanzi/hanzi.response";
import axios from "axios";
import useSWR from "swr";

export const useHanziLoaderValidate = (symbol: string) => {
  return useSWR(symbol && `hanzi-${symbol}`, async () => {
    try {
      const response = await axios.get<HanziDataResponse>(
        `${HANZI_API.dataLoadingURI}/${symbol}.json`
      );
      return !!response.data;
    } catch (error) {
      return false;
    }
  });
};
