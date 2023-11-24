import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import path from "path";

const dictPath = path.join(process.cwd(), "public", "dictionary");

class SingletonService {
  private static instance: SingletonService;

  private constructor() {}

  public static getInstance(): SingletonService {
    if (!SingletonService.instance) {
      SingletonService.instance = new SingletonService();
    }
    return SingletonService.instance;
  }

  async getFurigana(text: string) {
    const kuroshiro = new Kuroshiro();
    await kuroshiro.init(
      new KuromojiAnalyzer({
        dictPath,
      })
    );
    const furigana = await kuroshiro.convert(text, {
      to: "hiragana",
      mode: "furigana",
    });
    const onlyHiragana = await kuroshiro.convert(text, {
      to: "hiragana",
      mode: "normal",
    });
    const okurigana = await kuroshiro.convert(text, {
      to: "hiragana",
      mode: "okurigana",
    });

    return { furigana, onlyHiragana, okurigana };
  }
}

export const FuriganaService = SingletonService.getInstance();
