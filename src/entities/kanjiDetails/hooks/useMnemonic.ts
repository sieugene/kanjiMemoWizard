import { MAIN_API } from "@/shared/api/main";
import useSWR from "swr";

export const useMnemonic = (symbol: string) => {
  return useSWR(
    symbol && `kanji/mnemoni/${symbol}`,
    async () => {
      debugger;
      const response = await MAIN_API.mnemonic.getMnemonic(symbol);
      return response.data;
    },
    {
      errorRetryCount: 0,
    }
  );
};
