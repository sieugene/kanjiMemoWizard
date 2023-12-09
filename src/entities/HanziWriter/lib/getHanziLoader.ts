import { HANZI_API } from "@/shared/api/hanzi";
import { CharDataLoaderFn } from "hanzi-writer";

export const getHanziLoader: CharDataLoaderFn = (char, onLoad, onError) => {
  fetch(`${HANZI_API.dataLoadingURI}/${char}.json`)
    .then((res) => res.json())
    .then(onLoad)
    .catch(onError);
};
