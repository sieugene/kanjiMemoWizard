import axios from "axios";
import * as cheerio from "cheerio";

class SingletonService {
  private static instance: SingletonService;

  private KANJI_DAMAGE_SERVICE = "http://www.kanjidamage.com";

  private constructor() {}

  public static getInstance(): SingletonService {
    if (!SingletonService.instance) {
      SingletonService.instance = new SingletonService();
    }
    return SingletonService.instance;
  }

  // TODO node cache
  private async getUrlsList() {
    const response = await axios.get(
      this.proxy(`${this.KANJI_DAMAGE_SERVICE}/kanji`)
    );
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

  async scrapMnemonic(symbol: string) {
    const list = await this.getUrlsList();
    const linkData = list.find((l) => l.kanji === symbol);
    if (!linkData) {
      throw new Error("Cannot find kanji!");
    }
    const source = `${this.KANJI_DAMAGE_SERVICE}${linkData?.link}`;
    const response = await axios.get(this.proxy(source));
    const html = response.data;
    const $ = cheerio.load(html);
    const mnemonicHeader = $('h2:contains("Mnemonic")');
    const mnemonic = mnemonicHeader?.next?.("table")?.find?.("p")?.text();
    return { mnemonic, source };
  }

  private proxy(link: string) {
    // return `https://cors-anywhere.herokuapp.com/${link}`;
    return link;
  }
}

export const MnemonicService = SingletonService.getInstance();
