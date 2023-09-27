import { Schema, object, string } from "yup";

export type GetSentencesQueryArgs = { symbol: string };

export const GetSentencesSchema: Schema<GetSentencesQueryArgs> = object().shape(
  {
    symbol: string().required(),
  }
);
