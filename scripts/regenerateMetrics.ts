import { rawDataSelector } from "@/lib/maze/benchmark";
import { recalculateBenchmarkMetrics } from "../src/lib/maze/benchmark/recalculateMetrics";
import fs from "fs";

console.log("Regenerating metrics...");

const updated2020 = recalculateBenchmarkMetrics(rawDataSelector["20*20"]);

fs.writeFileSync(
  "./src/lib/maze/benchmark/rawData/20x20.json",
  JSON.stringify(updated2020, null, 2),
);

console.log("File 20*20 generated");

const updated3030 = recalculateBenchmarkMetrics(rawDataSelector["30*30"]);

fs.writeFileSync(
  "./src/lib/maze/benchmark/rawData/30x30.json",
  JSON.stringify(updated3030, null, 2),
);

console.log("File 30x30 generated");

const updated4040 = recalculateBenchmarkMetrics(rawDataSelector["40*40"]);

fs.writeFileSync(
  "./src/lib/maze/benchmark/rawData/40x40.json",
  JSON.stringify(updated4040, null, 2),
);

console.log("File 40x40 generated");


console.log("Successful metrics regeneration...");
