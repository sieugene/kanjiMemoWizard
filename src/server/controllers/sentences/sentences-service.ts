import { TatoebaService } from "./services/tatoeba";

class SingletonService {
  private static instance: SingletonService;
  private readonly service: TatoebaService;

  // eslint-disable-next-line no-unused-vars
  private constructor() {
    this.service = new TatoebaService();
  }

  public static getInstance(): SingletonService {
    if (!SingletonService.instance) {
      SingletonService.instance = new SingletonService();
    }
    return SingletonService.instance;
  }

  async getSentences(symbol: string) {
    const response = await this.service.search({ query: symbol });
    return response.data;
  }
}

export const SentencesService = SingletonService.getInstance();
