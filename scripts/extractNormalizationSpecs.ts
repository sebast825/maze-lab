import stats10x10 from "@/lib/maze/benchmark/rawData/generated/10x10-stats.json";
import stats20x20 from "@/lib/maze/benchmark/rawData/generated/20x20-stats.json";
import stats30x30 from "@/lib/maze/benchmark/rawData/generated/30x30-stats.json";

import stats40x40 from "@/lib/maze/benchmark/rawData/generated/40x40-stats.json";
import stats60x60 from "@/lib/maze/benchmark/rawData/generated/60x60-stats.json";
import fs from "fs";


function extractNormalizationSpecs(metricsArray: any[]) {
  const result: any = {};

  for (const item of metricsArray) {
    const metricMap: Record<string, string> = {
      avgDeadEndLength: "deadEndAvg",
      avgDecisionLength: "decisionEndAvg",
      tortuosityFeatureAvg: "tortuosityFeatureAvg",
      avgTortuosity: "avgTortuosity",
      shortestPathTortuosity: "shortestPathTortuosity",
      shortestPathDecisionAvg: "shortestPathDecisionAvg",
      repeatRatio: "repeatRatio",
      avgPathDetourRatio: "avgPathDetourRatio",
    };

    const newKey = metricMap[item.metric];
    if (newKey) {
      result[newKey] = {
        p5: item.p5,
        p95: item.p95,
      };
    }
  }

  return result;
}

const allMetrics = {
  "10x10": extractNormalizationSpecs(stats10x10),
  "20x20": extractNormalizationSpecs(stats20x20),
  "30x30": extractNormalizationSpecs(stats30x30),
  "40x40": extractNormalizationSpecs(stats40x40),
  "60x60": extractNormalizationSpecs(stats60x60),
};

fs.writeFileSync(
  `./src/lib/maze/metrics/normalize/mazeSizeSpecs.json`,
  JSON.stringify(allMetrics, null, 2),
);

console.log("Maze Specs created");
