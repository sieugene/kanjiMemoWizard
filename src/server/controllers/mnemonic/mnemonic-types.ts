import { MnemonicService } from "./mnemonic-service";
export type GetMnemonicResponse = ReturnType<
  (typeof MnemonicService)["scrapMnemonic"]
>;
