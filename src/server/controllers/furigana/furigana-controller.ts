/* eslint-disable no-unused-vars */
import { ValidatorGuard } from "@/server/guards/ValidatorGuard";
import { RestMethod } from "@/server/guards/methodGuard";
import { FuriganaService } from "./furigana.service";
import { NextApiResponse } from "next";
import { GetFuriganaResponse } from "./furigana-types";
import { GetFuriganaQueryArgs, GetFuriganaSchema } from "./furigana-schema";

export class FuriganaContoller {
  constructor(private readonly service = FuriganaService) {}
  getFurigana() {
    return RestMethod(
      ValidatorGuard(
        async (
          request,
          res: NextApiResponse<GetFuriganaResponse | { error: string }>
        ) => {
          try {
            const body = request.query as any as GetFuriganaQueryArgs;
            const data = await this.service.getFurigana(body.text);
            res.json(data);
          } catch (error: any) {
            console.log(error);
            res.status(400).json({
              error: error?.message || error?.data || "Unknown error",
            });
          }
        },
        GetFuriganaSchema,
        "query"
      ),
      "GET"
    );
  }
}
