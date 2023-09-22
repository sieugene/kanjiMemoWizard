import { Schema, object, string } from "yup";

export type GetMnemonicQueryArgs = { symbol: string };

export const GetMnemonicSchema: Schema<GetMnemonicQueryArgs> = object().shape({
  symbol: string().required(),
});
