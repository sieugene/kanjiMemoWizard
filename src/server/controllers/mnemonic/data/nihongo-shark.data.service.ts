import { nihongoSharkMnemonics } from "@/shared/data/nihongoshark";
import { MnemonicData } from "../mnemonic-types";

export class NihongoSharkDataService {
  private nihongoShark = nihongoSharkMnemonics;
  private serviceName = "NihongoSharkDeck";
  private static instance: NihongoSharkDataService;

  private constructor() {}

  public static getInstance(): NihongoSharkDataService {
    if (!NihongoSharkDataService.instance) {
      NihongoSharkDataService.instance = new NihongoSharkDataService();
    }
    return NihongoSharkDataService.instance;
  }

  findData(symbol: string): MnemonicData {
    const data = this.nihongoShark.find((a) => a.kanji === symbol);
    const mnemonic = `heisigStory: ${
      data?.heisigStory || "-"
    }\n\nheisigComment: ${data?.heisigComment || "-"}\n\nkoohiiStory1: ${
      data?.koohiiStory1 || "-"
    }\n\nkoohiiStory2: ${data?.koohiiStory2 || "-"}\n`;
    return {
      source: "https://ankiweb.net/shared/info/1956010956",
      mnemonic,
      service: this.serviceName,
    };
  }
}
