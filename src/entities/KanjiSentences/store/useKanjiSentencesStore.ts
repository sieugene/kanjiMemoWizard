import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { useZustandHydrate } from "@/shared/hooks/useZustandHydrate";

interface BearState {
  showFurigana: boolean;
  toggleShowFurigana: () => void;
}

const defaultState: BearState = {
  showFurigana: false,
  toggleShowFurigana: () => {},
};

const store = create<BearState>()(
  devtools(
    persist(
      (set, get) => ({
        ...defaultState,
        toggleShowFurigana: () => {
          set({ showFurigana: !get().showFurigana });
        },
      }),
      {
        name: "kanji-sentences",
      }
    )
  )
);

// Hydrate際にデータないかも、defaultStateを戻る
export const useKanjiSentencesStore = () => {
  return useZustandHydrate(store, (state) => state) || defaultState;
};
