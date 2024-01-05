import {
  GetFuriganaQueryArgs,
  GetFuriganaResponse,
  GetMnemonicsResponse,
  GetSentencesQueryArgs,
  GetSentencesResponse,
  SearchForPhraseQueryArgs,
  SearchForPhraseResponse,
} from "@/server";

import axios from "axios";

export const MAIN_API = {
  mnemonic: {
    getMnemonic: (symbol: string) =>
      axios.get<GetMnemonicsResponse>(`/api/mnemonic/${symbol}`),
  },
  sentences: {
    getSentences: (args: GetSentencesQueryArgs) =>
      axios.get<GetSentencesResponse>(`/api/sentences/${args.symbol}`),
  },
  furigana: {
    getFurigana: ({ text }: GetFuriganaQueryArgs) =>
      axios.get<GetFuriganaResponse>(`/api/furigana`, {
        params: {
          text,
        },
      }),
  },
  jisho: {
    searchForPhrase: ({ text }: SearchForPhraseQueryArgs) =>
      axios.get<SearchForPhraseResponse>(`/api/search?text=${text}`),
  },
};
