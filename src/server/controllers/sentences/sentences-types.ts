import { SentencesService } from "./sentences-service";

export type GetSentencesResponse = Awaited<
  ReturnType<(typeof SentencesService)["getSentences"]>
>;
