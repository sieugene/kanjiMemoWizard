import axios from "axios";
import * as cheerio from "cheerio";
import { getKanjiUrl } from "../lib/getKanjiUrl";
import { parseComponents } from "../lib/parseComponents";
import { v4 as uuidv4 } from "uuid";
const colors = ["#4c4c69", "#4a4abb", "#2e2e84"];

export type AnimateType = "svgClick" | "btnClick";
type BtnArgs = {
  "data-kanjivg-target": string;
  className: string;
};

export class KanjiAnimate {
  public $root: cheerio.CheerioAPI | null = null;
  public kanjiUrl: string = "";
  private className: string = "";
  private buttonArguments: BtnArgs = {
    "data-kanjivg-target": "",
    className: "",
  };
  constructor(
    // eslint-disable-next-line no-unused-vars
    public readonly symbol: string,
    // eslint-disable-next-line no-unused-vars
    private readonly animateType: AnimateType = "svgClick"
  ) {
    this.kanjiUrl = getKanjiUrl(symbol);
  }

  async install() {
    this.$root = await this.fetchKanjiBySymbol();
    return this.$root;
  }

  public attach(colorize?: boolean) {
    this.isInstalled();

    const svg = this.$root?.("svg");
    if (colorize) {
      this.colorizeParts(svg);
    }
    this.setClassName(`id-${uuidv4()}-${this.symbol}`);

    svg?.attr("class", this.className);

    if (this.animateType === "btnClick" && svg) {
      this.attachOnButton(svg);
    }

    return {
      html: svg?.toString() || "",
      className: this.className || "",
      buttonArguments: this.buttonArguments || {},
    };
  }

  public generateStepByStep(color = "white") {
    this.isInstalled();
    const paths = this.$root!!("path");
    paths.attr("fill", "none");
    paths.attr("stroke", color);
    paths.attr("stroke-width", "2");
    const parts: string[] = [];
    for (let i = 0; i < paths.length; i++) {
      const path = paths?.[i];
      const pathString = this.$root?.html(path);
      const prevPart = parts[i - 1] || "";
      parts.push(`${prevPart}${pathString}`);
    }
    return parts.map(
      (part) =>
        `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">${part}</svg>`
    );
  }

  public getRadicalParts() {
    this.isInstalled();
    return parseComponents(this.$root!!, this.symbol);
  }

  private async fetchKanjiBySymbol() {
    const response = await axios.get<string>(this.kanjiUrl);
    return cheerio.load(response.data);
  }

  private setClassName(className: string) {
    this.className = className;
  }

  private attachOnButton(element: cheerio.Cheerio<cheerio.Element>) {
    this.isInstalled();

    const uniqueAnimateId = `animate-${this.className}`;
    const uniqueAnimateBtnTrigger = `trigger-${this.className}`;
    this.buttonArguments = {
      "data-kanjivg-target": `#${uniqueAnimateId}`,
      className: uniqueAnimateBtnTrigger,
    };
    element.attr("id", uniqueAnimateId);
  }

  // Сделать область только на svg
  private colorizeParts(svg?: cheerio.Cheerio<cheerio.Element>) {
    this.isInstalled();
    const elements = this.getRadicalParts();
    const mainParts = elements[this.symbol];

    [...mainParts].map((radical, index) => {
      const partElement = svg?.find(`[kvg\\:element="${radical}"]`);
      const color = colors[index % colors.length] || "white";
      partElement?.find("path").attr("stroke", color);
    });
  }

  // guard
  private isInstalled() {
    if (!this.$root) {
      throw new Error("Install first!");
    }
  }
}
