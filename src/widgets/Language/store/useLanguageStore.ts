/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { useZustandHydrate } from "@/shared/hooks/useZustandHydrate";
import { useEffect } from "react";

export interface LanguageState {
  language: "ja" | "en";
  syncLanguage: (lang: LanguageState["language"]) => void;
}

const defaultState: LanguageState = {
  language: "en",
  syncLanguage: () => {},
};

const store = create<LanguageState>()(
  devtools(
    persist(
      (set, get) => ({
        ...defaultState,
        syncLanguage: (lang) => {
          set({ language: lang });
        },
      }),
      {
        name: "language",
      }
    )
  )
);

// Hydrate際にデータないかも、defaultStateを戻る
export const useLanguageStore = () => {
  return useZustandHydrate(store, (state) => state) || defaultState;
};

export const useSyncLanguage = (language: LanguageState["language"]) => {
  const { syncLanguage } = useLanguageStore();
  useEffect(() => {
    syncLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
};
