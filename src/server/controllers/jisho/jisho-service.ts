import JishoAPI from "unofficial-jisho-api";
import { ExtendedJishoSearch } from "./jisho-types";

const jisho = new JishoAPI();

class SingletonService {
  private static instance: SingletonService;
  private cache = new Map<string, ExtendedJishoSearch>();

  private constructor() {}

  public static getInstance(): SingletonService {
    if (!SingletonService.instance) {
      SingletonService.instance = new SingletonService();
    }
    return SingletonService.instance;
  }

  async searchForPhrase(text: string) {
    const cacheData = this.cache.get(text);
    if (cacheData) {
      return cacheData;
    }
    const phrase = await jisho.searchForPhrase(text).catch(() => null);
    const scrape = await jisho.scrapeForPhrase(text).catch(() => null);

    const data: ExtendedJishoSearch = {
      phrase: phrase?.data || [],
      scrape,
    };
    this.cache.set(text, data);

    return data;
  }
}

export const JishoService = SingletonService.getInstance();
