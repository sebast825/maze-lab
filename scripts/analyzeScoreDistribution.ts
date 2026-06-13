/**
 * Analyzes score distributions across benchmark datasets.
 *
 * Used to validate metric normalization, detect size-related bias,
 * and inspect the relative contribution of each score category
 * (features, paths, and alternative paths).
 */

import { rawDataGeneratedSelector } from "@/lib/maze/benchmark";
import { defaultWeights } from "@/lib/maze/metrics/scoring/defaultWeights";
import { DATASET } from "./dataset.config";
import { getClosestSizeKey } from "@/lib/maze/metrics/normalize/mazeSizeSpecs";
import { analyzeMaze } from "@/lib/maze/metrics/scoring/scoring";
import { getMetricStats } from "@/lib/maze/benchmark/metricStats/getMetrics";
import { MazeScores } from "@/lib/maze/metrics/scoring/types";

const getMazeScores = (mazeSize: keyof typeof DATASET) => {
  return DATASET[mazeSize].map((mazeData) => {
    const { scores, weighted } = analyzeMaze(
      mazeData.metrics,
      defaultWeights,
      getClosestSizeKey(mazeData.maze.rows * mazeData.maze.cols),
    );

    return {
      scores,
      pathsAlternative: weighted.pathsAlternative,
    };
  });
};

const avgScoreResult = (results: MazeScores[]) => {
  const averages = results.reduce(
    (acc, r) => {
      acc.features += r.features;
      acc.paths += r.paths;
      acc.pathsAlternative += r.pathsAlternative;
      acc.total += r.total;

      return acc;
    },
    {
      features: 0,
      paths: 0,
      pathsAlternative: 0,
      total: 0,
    },
  );

  return {
    features: `${((averages.features / averages.total) * 100).toFixed(2)}%`,
    paths: `${((averages.paths / averages.total) * 100).toFixed(2)}%`,
    pathsAlternative: `${(
      (averages.pathsAlternative / averages.total) *
      100
    ).toFixed(2)}%`,
  };
};

const allScores: MazeScores[] = [];

Object.keys(rawDataGeneratedSelector).forEach((mazeSize) => {
  const size = mazeSize as keyof typeof rawDataGeneratedSelector;

  const results = getMazeScores(size);
  allScores.push(...results.map((r) => r.scores));

  const scoreStats = getMetricStats(results.map((r) => r.scores));

  const avgResult = avgScoreResult(results.map((r) => r.scores));

  console.log("\n====================================");
  console.log(`Maze Size: ${mazeSize}`);
  console.log("====================================");
  console.table(scoreStats);
  console.table(avgResult);
});

console.log("\n====================================");
console.log("GLOBAL SCORE DISTRIBUTION");
console.log("====================================");

console.log(getMetricStats(allScores).filter((s) => s.metric === "total"));
