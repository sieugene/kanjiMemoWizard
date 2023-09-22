import axios from "axios";
import * as cheerio from "cheerio";
import * as iconv from "iconv-lite";
import { ScrapperData } from "../mnemonic-types";

export class NihongoMonashScrapper {
  private static instance: NihongoMonashScrapper;
  private service = "http://nihongo.monash.edu/henshall_mnem.html";

  private constructor() {}

  public static getInstance(): NihongoMonashScrapper {
    if (!NihongoMonashScrapper.instance) {
      NihongoMonashScrapper.instance = new NihongoMonashScrapper();
    }
    return NihongoMonashScrapper.instance;
  }

  private async prepare() {
    const response = await axios.get(`${this.service}`, {
      responseType: "arraybuffer",
    });
    const htmlBuffer = response.data;
    const html = iconv.decode(htmlBuffer, "euc-jp");
    const $ = cheerio.load(html, {
      decodeEntities: false,
      xmlMode: false,
      recognizeCDATA: false,
    });
    const rows = $("table tr");
    const data: { symbol: string; id: number; text: string }[] = [];
    rows.each((_, row) => {
      const cells = $(row).find("td");
      const symbol = $(cells[0]).text().toString();
      const id = parseInt($(cells[1]).text(), 10);
      const text = $(cells[2]).text();
      data.push({
        symbol,
        id,
        text,
      });
    });
    return data;
  }

  async scrapData(symbol: string): Promise<ScrapperData> {
    const list = await this.prepare();
    const data = list.find((a) => a.symbol === symbol);

    return {
      mnemonic: data?.text || "-",
      source: this.service,
    };
  }
}
