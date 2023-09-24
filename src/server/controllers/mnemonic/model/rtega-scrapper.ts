import axios from "axios";
import * as cheerio from "cheerio";
import { ScrapperData } from "../mnemonic-types";

export class RtageScrapper {
  private static instance: RtageScrapper;
  private service = "https://rtega.be/chmn/index.php?c=";

  private constructor() {}

  public static getInstance(): RtageScrapper {
    if (!RtageScrapper.instance) {
      RtageScrapper.instance = new RtageScrapper();
    }
    return RtageScrapper.instance;
  }

  async scrapData(symbol: string): Promise<ScrapperData> {
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

    const combinedText = liTextArray.join(";------;");

    return {
      mnemonic: combinedText,
      source,
    };
  }
}
