/* eslint-disable no-unused-vars */
import { ValidatorGuard } from "@/server/guards/ValidatorGuard";
import { RestMethod } from "@/server/guards/methodGuard";
import { GetMnemonicQueryArgs, GetMnemonicSchema } from "./mnemonic-schema";
import { MnemonicService } from "./mnemonic-service";
import { NextApiResponse } from "next";
import { GetMnemonicResponse } from "./mnemonic-types";

export class MnemonicContoller {
  constructor(private readonly service = MnemonicService) {}
  getMnemonic() {
    return RestMethod(
      ValidatorGuard(
        async (
          request,
          res: NextApiResponse<GetMnemonicResponse | { error: string }>
        ) => {
          try {
            const body = request.query as any as GetMnemonicQueryArgs;
            const data = await this.service.scrapMnemonic(body.symbol);
            res.json(data as any);
          } catch (error: any) {
            res.status(400).json({
              error: error?.message || error?.data || "Unknown error",
            });
          }
        },
        GetMnemonicSchema,
        "query"
      ),
      "GET"
    );
  }
}
