import {
  BASE_PART_KEY,
  RADICALS_COMPONENTS,
  RADICAL_ELEMENT_KEY,
} from "@/shared/data/radicals-components";
import { useState } from "react";

export const useRadicalsTree = (symbol: string) => {
  const [data] = useState(RADICALS_COMPONENTS);

  return data.basePart?.[symbol as BASE_PART_KEY]?.map((key) => {
    const el = key as unknown as RADICAL_ELEMENT_KEY;
    return {
      element: el,
      deep: data?.elements?.[el],
    };
  });
};
