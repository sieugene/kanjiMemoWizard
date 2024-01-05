export const ROUTES = {
  home: "/",
  kanji: (symbol: string) => `/kanji/${symbol}`,
  404: "/404",
  search: (text: string) => `/search?text=${text || ""}`,
};
