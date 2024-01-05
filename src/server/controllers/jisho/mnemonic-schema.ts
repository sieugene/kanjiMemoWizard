import { Schema, object, string } from "yup";

export type SearchForPhraseQueryArgs = { text: string };

export const SearchForPhraseSchema: Schema<SearchForPhraseQueryArgs> =
  object().shape({
    text: string().required(),
  });
