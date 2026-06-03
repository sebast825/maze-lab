import { MazeBenchmark } from "./types";

//get the metrics to a plan object
const round = (value: number) => Number(value.toFixed(2));

export const exportBenchmarkMetrics = (benchmarks: MazeBenchmark[]) => {
  return benchmarks.map((benchmark) => ({
    id: benchmark.id,
    name: benchmark.name,

    totalIntersections: benchmark.metrics.totalIntersections,
    totalPaths: benchmark.metrics.totalPaths,
    shortestPathLength: benchmark.metrics.shortestPathLength,
    decisionPenalty: benchmark.metrics.features.decisionPenalty,
    ambiguity: benchmark.metrics.features.ambiguity,
    tortuosity: benchmark.metrics.features.tortuosity,
    deadEndBranchLength: benchmark.metrics.features.deadEndBranchLength,
    decisionBranchLength: benchmark.metrics.features.decisionBranchLength,
    deadEndBranchCount: benchmark.metrics.features.deadEndBranchCount,
    decisionBranchCount: benchmark.metrics.features.decisionBranchCount,
        difficulty : benchmark.metrics.features.difficulty,


    avgTortuosity: round(benchmark.metrics.paths.avgTortuosity),
    minTortuosity: round(benchmark.metrics.paths.minTortuosity),
    maxTortuosity: round(benchmark.metrics.paths.maxTortuosity),
    avgTurnDensity: round(benchmark.metrics.paths.avgTurnDensity),
    shortestPathTurnDensity: round(
      benchmark.metrics.paths.shortestPathTurnDensity,
    ),

    repeatedCellCount: benchmark.metrics.overlaps.repeatedCellCount,
    repeatedOccurrences: benchmark.metrics.overlaps.repeatedOccurrences,
    uniqueCellCount: benchmark.metrics.overlaps.uniqueCellCount,
    avgRedundantLength: round(benchmark.metrics.overlaps.avgRedundantLength),
    maxRedundantLength: benchmark.metrics.overlaps.maxRedundantLength,
  }));
};
//we give the result of exportBenchmarkMetrics to get the stats
export const getMetricStats = (rows: Record<string, any>[]) => {
  const numericKeys = Object.keys(rows[0]).filter(
    (key) => typeof rows[0][key] === "number",
  );

  return numericKeys.map((key) => {
    const values = rows.map((r) => r[key]);

    return {
      metric: key,
      min: Math.min(...values),
      avg: Number(
        (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2),
      ),
      max: Math.max(...values),
    };
  });
};
