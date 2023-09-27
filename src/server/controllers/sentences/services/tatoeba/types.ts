interface Paging {
  Sentences: {
    finder: string;
    page: number;
    current: number;
    count: number;
    perPage: number;
    start: number;
    end: number;
    prevPage: boolean;
    nextPage: boolean;
    pageCount: number;
    sort: string;
    direction: string;
    limit: null;
    sortDefault: boolean;
    directionDefault: boolean;
    scope: null;
    completeSort: {
      "Sentences.created": string;
    };
  };
}

interface Translation {
  id: number;
  text: string;
  lang: string;
  correctness: number;
  script: null;
  transcriptions: any[];
  audios: any[];
  isDirect: boolean;
  lang_name: string;
  dir: string;
  lang_tag: string;
}

interface Sentence {
  id: number;
  text: string;
  lang: string;
  correctness: number;
  script: null;
  license: string;
  translations: Translation[][];
  transcriptions: any[];
  audios: any[];
  user: {
    username: string;
  };
  lang_name: string;
  dir: string;
  lang_tag: string;
  is_favorite: null;
  is_owned_by_current_user: boolean;
  permissions: null;
  max_visible_translations: number;
  current_user_review: null;
}

export interface TATOEBA_API_SEARCH_RESPONSE {
  paging: Paging;
  results: Sentence[];
}

// search?from=jpn&trans_filter=limit&query=%E8%91%89&sort=created&trans_to=eng&to=eng

export interface TATOEBA_API_SEARCH_PARAMS {
  from: string;
  trans_filter: string;
  query: string;
  sort: string;
  trans_to: string;
  to: string;
}
