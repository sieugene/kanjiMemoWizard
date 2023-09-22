import { GetMnemonicResponse } from "@/server";
import axios from "axios";

export const MAIN_API = {
  mnemonic: {
    getMnemonic: (symbol: string) =>
      axios.get<GetMnemonicResponse>(`/api/mnemonic/${symbol}`),
  },
};
