import { FuriganaService } from "./furigana.service";

export type GetFuriganaResponse = Awaited<
  ReturnType<(typeof FuriganaService)["getFurigana"]>
>;
