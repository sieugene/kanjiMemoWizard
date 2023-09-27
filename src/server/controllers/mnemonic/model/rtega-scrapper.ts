import axios from "axios";
import * as cheerio from "cheerio";
import { MnemonicData } from "../mnemonic-types";

export class RtegaScrapper {
  private static instance: RtegaScrapper;
  private service = "https://rtega.be/chmn/index.php?c=";
  private serviceName = "Rtega";

  private constructor() {}

  public static getInstance(): RtegaScrapper {
    if (!RtegaScrapper.instance) {
      RtegaScrapper.instance = new RtegaScrapper();
    }
    return RtegaScrapper.instance;
  }

  async scrapData(symbol: string): Promise<MnemonicData> {
    const source = `${this.service}${symbol}`;
    const response = await axios.get(source);
    const html = response.data;
    const $ = cheerio.load(html);

    const tdElements = $("td#chmn");

    const liTextArray = tdElements
      .eq(1)
      .find("li")
      .map((index, element) => $(element).text())
      .get();

    const combinedText = liTextArray.join("\n");

    return {
      mnemonic: combinedText,
      source,
      service: this.serviceName,
    };
  }
}
