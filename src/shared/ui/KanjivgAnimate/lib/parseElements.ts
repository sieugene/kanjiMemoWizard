import * as cheerio from "cheerio";

type Parts = string[];
type Components = {
  [key: string]: {
    parts: Parts;
    main: string;
  };
};

export const parseElements = ($: cheerio.CheerioAPI) => {
  const elementsWithKvgElement = $("[kvg\\:element]");
  const result: Components = {};
  elementsWithKvgElement.each((index, element) => {
    const main = $(element).attr("kvg:element") || "";
    const parts: Parts = [];

    const childElements = $(element).find("[kvg\\:element]");
    childElements.each((index, childElement) => {
      const part = $(childElement).attr("kvg:element") || "";
      parts.push(part);
    });
    if (!result[main]) {
      result[main] = {
        main,
        parts: parts.filter((part) => part !== main),
      };
    }
  });
  return Object.values(result);
};
