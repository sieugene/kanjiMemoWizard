import axios from "axios";
import {
  TATOEBA_API_SEARCH_PARAMS,
  TATOEBA_API_SEARCH_RESPONSE,
} from "./types";

const searchDefault: TATOEBA_API_SEARCH_PARAMS = {
  from: "jpn",
  trans_filter: "limit",
  query: "",
  sort: "created",
  trans_to: "eng",
  to: "eng",
};

export class TatoebaService {
  private readonly apiUrl = "https://tatoeba.org/en/api_v0";

  search(params: Partial<TATOEBA_API_SEARCH_PARAMS>) {
    const query = {
      ...searchDefault,
      ...params,
    };
    return axios.get<TATOEBA_API_SEARCH_RESPONSE>(
      `${this.apiUrl}/search?from=${query.from}&trans_filter=${query.trans_filter}&query=${query.query}&sort=${query.sort}&trans_to=${query.trans_to}&to=${query.to}`
    );
  }
}
