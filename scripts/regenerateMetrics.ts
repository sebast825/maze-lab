import { rawDataGeneratedSelector, rawDataManualSelector } from "@/lib/maze/benchmark";
import { recalculateBenchmarkMetrics } from "../src/lib/maze/benchmark/recalculateMetrics";
import fs from "fs";


//const DATASET = rawDataGeneratedSelector;
 const DATASET = rawDataManualSelector;
const FOLDER = DATASET === rawDataGeneratedSelector ? "generated" : "manual";
console.log("Regenerating metrics...");

const updated2020 = recalculateBenchmarkMetrics(DATASET["20*20"]);

fs.writeFileSync(
  `./src/lib/maze/benchmark/rawData/${FOLDER}/20x20.json`,
  JSON.stringify(updated2020, null, 2),
);

console.log("File 20*20 generated");

const updated3030 = recalculateBenchmarkMetrics(DATASET["30*30"]);

fs.writeFileSync(
  `./src/lib/maze/benchmark/rawData/${FOLDER}/30x30.json`,
  JSON.stringify(updated3030, null, 2),
);

console.log("File 30x30 generated");

const updated4040 = recalculateBenchmarkMetrics(DATASET["40*40"]);

fs.writeFileSync(
  `./src/lib/maze/benchmark/rawData/${FOLDER}/40x40.json`,
  JSON.stringify(updated4040, null, 2),
);

console.log("File 40x40 generated");


console.log("Successful metrics regeneration...");
