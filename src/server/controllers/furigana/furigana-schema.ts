import { Schema, object, string } from "yup";

export type GetFuriganaQueryArgs = { text: string };

export const GetFuriganaSchema: Schema<GetFuriganaQueryArgs> = object().shape({
  text: string().required(),
});
