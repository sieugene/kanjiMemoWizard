import { MAIN_API } from "@/shared/api/main";
import useSWR from "swr";

export const useFurigana = (input: string) => {
  return useSWR(
    !!input?.length && `api/furigana-converter/${input}`,
    async () => {
      const response = await MAIN_API.furigana.getFurigana({ text: input });
      return response?.data;
    }
  );
};
