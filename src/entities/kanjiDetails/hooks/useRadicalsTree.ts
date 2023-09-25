import { RADICALS_COMPONENTS } from "@/shared/data/radicals-components";
import { useState } from "react";

export const useRadicalsTree = (symbol: string) => {
  const [data] = useState(RADICALS_COMPONENTS);

  return {
    symbol,
    tree: data.radicals[symbol],
  };
};
