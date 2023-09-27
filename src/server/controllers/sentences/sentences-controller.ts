/* eslint-disable no-unused-vars */
import { ValidatorGuard } from "@/server/guards/ValidatorGuard";
import { RestMethod } from "@/server/guards/methodGuard";
import { NextApiResponse } from "next";
import { GetSentencesQueryArgs, GetSentencesSchema } from "./sentences-schema";
import { SentencesService } from "./sentences-service";
import { GetSentencesResponse } from "./sentences-types";

export class SentencesContoller {
  constructor(private readonly service = SentencesService) {}
  getSentences() {
    return RestMethod(
      ValidatorGuard(
        async (
          request,
          res: NextApiResponse<GetSentencesResponse | { error: string }>
        ) => {
          try {
            const body = request.query as any as GetSentencesQueryArgs;
            const data = await this.service.getSentences(body.symbol);
            res.json(data);
          } catch (error: any) {
            console.log(error);
            res.status(400).json({
              error: error?.message || error?.data || "Unknown error",
            });
          }
        },
        GetSentencesSchema,
        "query"
      ),
      "GET"
    );
  }
}
