import { NihongoSharkDataService } from "./data/nihongo-shark.data.service";
import { MnemonicData } from "./mnemonic-types";
import { KanjiDamageScrapper } from "./model/kanji-damage-scrapper";
import { NihongoMonashScrapper } from "./model/nihongo-monash-scrapper";
import { RtegaScrapper } from "./model/rtega-scrapper";

class SingletonService {
  private static instance: SingletonService;
  private cache = new Map<string, MnemonicData[]>();

  private constructor() {}

  public static getInstance(): SingletonService {
    if (!SingletonService.instance) {
      SingletonService.instance = new SingletonService();
    }
    return SingletonService.instance;
  }

  async getMnemonics(symbol: string) {
    const cacheData = this.cache.get(symbol);
    if (cacheData?.length) {
      return cacheData;
    }
    const kanjiDamage = await KanjiDamageScrapper.getInstance()
      .scrapData(symbol)
      .catch(() => null);
    const nihongoMonash = await NihongoMonashScrapper.getInstance()
      .scrapData(symbol)
      .catch(() => null);
    const rtega = await RtegaScrapper.getInstance()
      .scrapData(symbol)
      .catch(() => null);
    const nihongoShark = NihongoSharkDataService.getInstance().findData(symbol);
    const data = [kanjiDamage, nihongoMonash, rtega, nihongoShark].filter(
      (a) => !!a?.mnemonic
    ) as MnemonicData[];

    this.cache.set(symbol, data);

    return data;
  }
}

export const MnemonicService = SingletonService.getInstance();
