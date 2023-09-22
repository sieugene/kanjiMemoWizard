import axios from "axios";
import * as cheerio from "cheerio";
import { ScrapperData } from "../mnemonic-types";

export class KanjiDamageScrapper {
  private static instance: KanjiDamageScrapper;
  private service = "http://www.kanjidamage.com";

  private constructor() {}

  public static getInstance(): KanjiDamageScrapper {
    if (!KanjiDamageScrapper.instance) {
      KanjiDamageScrapper.instance = new KanjiDamageScrapper();
    }
    return KanjiDamageScrapper.instance;
  }

  private async prepare() {
    const response = await axios.get(`${this.service}/kanji`);
    const html = response.data;
    const $ = cheerio.load(html);
    const mappedURL: { link: string; kanji: string }[] = [];
    $(".table a").each((_idx, el) => {
      const attributes = $(el).attr();
      attributes?.href &&
        mappedURL.push({
          link: attributes?.href,
          kanji: $(el).text(),
        });
    });
    return mappedURL;
  }

  async scrapData(symbol: string): Promise<ScrapperData> {
    const list = await this.prepare();
    const linkData = list.find((l) => l.kanji === symbol);
    if (!linkData) {
      throw new Error("Cannot find kanji!");
    }
    const source = `${this.service}${linkData?.link}`;
    const response = await axios.get(source);
    const html = response.data;
    const $ = cheerio.load(html);
    const mnemonicHeader = $('h2:contains("Mnemonic")');
    return {
      mnemonic: mnemonicHeader?.next?.("table")?.find?.("p")?.text(),
      source,
    };
  }
}
