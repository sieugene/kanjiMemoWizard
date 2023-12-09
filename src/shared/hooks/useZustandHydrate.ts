/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

/**
 * 「zustandのpersist」はNext.jsへデータの復元問題があります
 */
export const useZustandHydrate = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
