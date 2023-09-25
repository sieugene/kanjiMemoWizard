import * as cheerio from "cheerio";

export const parseComponents = ($: cheerio.CheerioAPI, symbol: string) => {
  const resultData = {};
  return extractData($(`g[kvg\\:element="${symbol}"]`), $, symbol, resultData);
};

function extractData(
  element: cheerio.Cheerio<cheerio.Element>,
  $root: cheerio.CheerioAPI,
  parentElementId: string,
  resultData: any
) {
  const phon = element.children("g[kvg\\:phon]");
  const original = element.children("g[kvg\\:original]");
  const elements = element.children("g[kvg\\:element]");

  [phon, original, elements].map((a) =>
    a.each((index, childElement) => {
      const childId =
        $root(childElement).attr("kvg:element") ||
        $root(childElement).attr("kvg:phon") ||
        $root(childElement).attr("kvg:original");
      if (childId && parentElementId) {
        const prevData = resultData[parentElementId] || [];
        resultData[parentElementId] = [...prevData, childId];
        extractData($root(childElement), $root, childId, resultData);
      }
    })
  );

  return resultData;
}
