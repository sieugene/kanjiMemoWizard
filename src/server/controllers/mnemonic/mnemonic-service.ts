import { NihongoSharkDataService } from "./data/nihongo-shark.data.service";
import { KanjiDamageScrapper } from "./model/kanji-damage-scrapper";
import { NihongoMonashScrapper } from "./model/nihongo-monash-scrapper";
import { RtegaScrapper } from "./model/rtega-scrapper";

class SingletonService {
  private static instance: SingletonService;

  private constructor() {}

  public static getInstance(): SingletonService {
    if (!SingletonService.instance) {
      SingletonService.instance = new SingletonService();
    }
    return SingletonService.instance;
  }
  // TODO node cache
  async getMnemonics(symbol: string) {
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
    return [kanjiDamage, nihongoMonash, rtega, nihongoShark].filter((a) => !!a);
  }
}

export const MnemonicService = SingletonService.getInstance();
