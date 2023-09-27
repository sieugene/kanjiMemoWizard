import { GetMnemonicsResponse } from "@/server";
import axios from "axios";

export const MAIN_API = {
  mnemonic: {
    getMnemonic: (symbol: string) =>
      axios.get<GetMnemonicsResponse>(`/api/mnemonic/${symbol}`),
  },
};
