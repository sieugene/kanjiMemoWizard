/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { useZustandHydrate } from "@/shared/hooks/useZustandHydrate";

interface SearchState {
  input: string;
  setInput: (value: string) => void;
}

const defaultState: SearchState = {
  input: "",
  setInput: () => {},
};

const store = create<SearchState>()(
  devtools((set, get) => ({
    ...defaultState,
    setInput: (value) => {
      set({ input: value });
    },
  }))
);

// Hydrate際にデータないかも、defaultStateを戻る
export const useSearchKanjiStore = () => {
  return useZustandHydrate(store, (state) => state) || defaultState;
};
