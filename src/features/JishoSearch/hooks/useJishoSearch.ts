import { MAIN_API } from "@/shared/api/main";
import useSWR from "swr";

export const useJishoSearch = (text: string) => {
  return useSWR(!!text?.length && `jisho/search/${text}`, async () => {
    const response = await MAIN_API.jisho.searchForPhrase({ text });
    return response?.data;
  });
};
