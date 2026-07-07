import { cp, mkdir, rm } from "node:fs/promises";

const files = [
  "index.html",
  "styles.css",
  "script.js",
  "plant-hibiscus-mixed-deck.jpg",
  "plant-hibiscus-red-close.jpg",
  "plant-hibiscus-red-indoor.jpg",
  "plant-hibiscus-red-potted.jpg",
  "plant-jasmine-buds-close.jpg",
  "plant-jasmine-buds-potted.jpg",
  "plant-jasmine-double-blooms.jpg",
  "plant-jasmine-double-cluster.jpg",
  "plant-jasmine-potted-deck.jpg",
  "plant-jasmine-shrub-full.jpg",
  "plant-jasmine-white-buds.jpg"
];

await rm("dist", { force: true, recursive: true });
await mkdir("dist", { recursive: true });

for (const file of files) {
  await cp(file, `dist/${file}`);
}
