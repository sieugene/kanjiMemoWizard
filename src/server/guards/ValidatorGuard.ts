import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Schema } from "yup";

export const ValidatorGuard =
  (
    handler: NextApiHandler,
    schema: Schema<any>,
    scope: "body" | "query" = "body"
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req[scope];
    try {
      await schema.validate(body);
      return handler(req, res);
    } catch (error: any) {
      const errors = error?.errors || ["unknown fields"];
      res.status(400).json(errors);
    }
  };
