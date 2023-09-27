import { MnemonicService } from "./mnemonic-service";
export type GetMnemonicsResponse = Awaited<
  ReturnType<(typeof MnemonicService)["getMnemonics"]>
>;

export type MnemonicData = {
  mnemonic: string;
  source: string;
  service: string;
};
