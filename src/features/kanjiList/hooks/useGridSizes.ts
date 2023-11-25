import { throttle } from "lodash";
import { useEffect, useMemo, useState } from "react";

export const useGridSizes = (
  columnWidth: number,
  maxColumnCount?: number,
  minColumnCount?: number
) => {
  const [columnCount, setColumnCount] = useState(6);

  const listWidth = useMemo(
    () => columnWidth * columnCount,
    [columnCount, columnWidth]
  );

  const calculateColumnCount = () => {
    const nextColumnCount = Math.floor(window.innerWidth / columnWidth) - 1;
    if (minColumnCount && minColumnCount >= nextColumnCount) {
      setColumnCount(minColumnCount);
      return;
    }
    if (maxColumnCount && nextColumnCount >= maxColumnCount) {
      setColumnCount(maxColumnCount);
      return;
    }
    setColumnCount(nextColumnCount);
  };

  const throttledCalculateColumnCount = throttle(calculateColumnCount, 500);

  useEffect(() => {
    // is client
    if (typeof window === "undefined") return;
    calculateColumnCount();
    const handleResize = () => {
      throttledCalculateColumnCount();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [throttledCalculateColumnCount]);

  return { listWidth, columnCount, columnWidth };
};
