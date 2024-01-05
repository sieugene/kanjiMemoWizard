/* eslint-disable no-unused-vars */
import { ValidatorGuard } from "@/server/guards/ValidatorGuard";
import { RestMethod } from "@/server/guards/methodGuard";
import { NextApiResponse } from "next";
import { JishoService } from "./jisho-service";
import { SearchForPhraseResponse } from "./jisho-types";
import {
  SearchForPhraseQueryArgs,
  SearchForPhraseSchema,
} from "./mnemonic-schema";

export class JishoContoller {
  constructor(private readonly service = JishoService) {}
  searchForPhrase() {
    return RestMethod(
      ValidatorGuard(
        async (
          request,
          res: NextApiResponse<SearchForPhraseResponse | { error: string }>
        ) => {
          try {
            const body = request.query as any as SearchForPhraseQueryArgs;
            const data = await this.service.searchForPhrase(body.text);
            res.json(data);
          } catch (error: any) {
            console.log(error);
            res.status(400).json({
              error: error?.message || error?.data || "Unknown error",
            });
          }
        },
        SearchForPhraseSchema,
        "query"
      ),
      "GET"
    );
  }
}
