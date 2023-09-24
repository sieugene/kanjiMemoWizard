import { KanjiDamageScrapper } from "./model/kanji-damage-scrapper";
import { NihongoMonashScrapper } from "./model/nihongo-monash-scrapper";
import { RtageScrapper } from "./model/rtega-scrapper";

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
  async scrapMnemonic(symbol: string) {
    const kanjiDamage = await KanjiDamageScrapper.getInstance().scrapData(
      symbol
    );
    const nihongoMonash = await NihongoMonashScrapper.getInstance().scrapData(
      symbol
    );
    const rtage = await RtageScrapper.getInstance().scrapData(symbol);
    return [kanjiDamage, nihongoMonash, rtage];
  }
}

export const MnemonicService = SingletonService.getInstance();
