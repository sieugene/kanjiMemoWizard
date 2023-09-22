import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export type API_METHOD = "POST" | "GET" | "PUT" | "DELETE";

export const RestMethod =
  (handler: NextApiHandler, methodName: API_METHOD) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method === methodName) {
      return handler(req, res);
    }
    res.setHeader("Allow", [methodName]);
    res.status(405).end(`Method ${method} Not Allowed`);
    return false;
  };
