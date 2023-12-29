import { useZustandHydrate } from "@/shared/hooks/useZustandHydrate";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface HeaderState {
  isOpen: boolean;
  toggleOpen: () => void;
  close: () => void;
}

const defaultState: HeaderState = {
  isOpen: false,
  toggleOpen: () => {},
  close: () => {},
};

const store = create<HeaderState>()(
  devtools((set, get) => ({
    ...defaultState,
    toggleOpen: () => {
      set({ isOpen: !get().isOpen });
    },
    close: () => {
      set({ isOpen: false });
    },
  }))
);

// Hydrate際にデータないかも、defaultStateを戻る
export const useHeaderStore = () => {
  return useZustandHydrate(store, (state) => state) || defaultState;
};
