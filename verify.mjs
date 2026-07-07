import { existsSync, readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const imageSources = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) => match[1]);
const filters = [...html.matchAll(/data-filter="([^"]+)"/g)].map((match) => match[1]);
const cardCategories = [...html.matchAll(/<article class="plant-card" data-category="([^"]+)"/g)].map((match) => match[1]);
const missingImages = imageSources.filter((source) => !existsSync(source));
const filterCoverage = filters
  .filter((filter) => filter !== "all")
  .map((filter) => ({
    filter,
    matchingCards: cardCategories.filter((category) => category.split(" ").includes(filter)).length,
  }));

const result = {
  imageCount: imageSources.length,
  missingImages,
  filters,
  cardCount: cardCategories.length,
  filterCoverage,
};

console.log(JSON.stringify(result, null, 2));

if (missingImages.length > 0 || filterCoverage.some((item) => item.matchingCards === 0)) {
  process.exitCode = 1;
}
