import {
  GetMnemonicsResponse,
  GetSentencesQueryArgs,
  GetSentencesResponse,
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
};
