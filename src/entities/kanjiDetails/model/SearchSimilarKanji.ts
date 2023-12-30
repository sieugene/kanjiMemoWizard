import { SIMILAR_KANJI } from "@/shared/data/similar-kanji";

export type SimilarPair = string[];

class SearchEngine {
  private index: Record<string, SimilarPair> = {};

  constructor(data: SimilarPair[]) {
    this.buildIndex(data);
  }

  private buildIndex(data: SimilarPair[]): void {
    for (const pair of data) {
      const uniqueKey = pair[0];
      if (!this.index[uniqueKey]) {
        this.index[uniqueKey] = pair;
      }
    }
  }

  search(query: string) {
    const results: SimilarPair = this.index[query] || [];
    return results;
  }
}

const SearchSimilarKanji = new SearchEngine(SIMILAR_KANJI);
export { SearchSimilarKanji };
