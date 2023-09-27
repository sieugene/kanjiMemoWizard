import { GetSentencesQueryArgs } from "@/server";
import { MAIN_API } from "@/shared/api/main";
import useSWR from "swr";

export const useKanjiSentences = ({ symbol }: GetSentencesQueryArgs) => {
  return useSWR(symbol && `sentence-${symbol}`, async () => {
    const response = await MAIN_API.sentences.getSentences({ symbol });
    return response?.data?.results.map((data) => {
      const translate = data?.translations?.[0]?.[0];
      return {
        id: data.id,
        sentence: data?.text || "-",
        translate: translate?.text || "-",
        translateLangName: translate?.lang_name || "-",
      };
    });
  });
};
