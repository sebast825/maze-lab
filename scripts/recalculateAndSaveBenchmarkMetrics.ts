import { recalculateBenchmarkMetrics } from "../src/lib/maze/benchmark/recalculateMetrics";
import fs from "fs";
import { DATASET, DATASET_MODE } from "./dataset.config";

const FOLDER = DATASET_MODE === "generated" ? "generated" : "manual";

console.log("Regenerating metrics...");

function recalculateAndSaveBenchmarkMetrics(mazeSize: keyof typeof DATASET, file: string) {
  const updated = recalculateBenchmarkMetrics(DATASET[mazeSize]);

  fs.writeFileSync(
    `./src/lib/maze/benchmark/rawData/${FOLDER}/${file}.json`,
    JSON.stringify(updated, null, 2),
  );

  console.log(`File ${file} generated`);
}

  // recalculateAndSaveBenchmarkMetrics("10*10", "10x10");
  // recalculateAndSaveBenchmarkMetrics("60*60", "60x60");

recalculateAndSaveBenchmarkMetrics("20*20", "20x20");

 recalculateAndSaveBenchmarkMetrics("30*30", "30x30");

 recalculateAndSaveBenchmarkMetrics("40*40", "40x40");

