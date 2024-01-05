import { JishoAPIResult, ScrapeParseResult } from "unofficial-jisho-api";
import { JishoService } from "./jisho-service";
export type SearchForPhraseResponse = Awaited<
  ReturnType<(typeof JishoService)["searchForPhrase"]>
>;

export type ExtendedJishoSearch = {
  scrape: ScrapeParseResult | null;
  phrase: JishoAPIResult["data"];
};
