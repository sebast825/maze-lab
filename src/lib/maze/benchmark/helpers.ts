import { MazeBenchmark, MetricStats } from "./types";

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
    tortuosity: benchmark.metrics.features.tortuosity,
    deadEndBranchLength: benchmark.metrics.features.deadEndBranchLength,
    decisionBranchLength: benchmark.metrics.features.decisionBranchLength,
    deadEndBranchCount: benchmark.metrics.features.deadEndBranchCount,
    decisionBranchCount: benchmark.metrics.features.decisionBranchCount,

    avgTortuosity: benchmark.metrics.paths.avgTortuosity,

    shortestPathTortuosity: benchmark.metrics.paths.shortestPathTortuosity,
    repeatRatio: benchmark.metrics.pathsAlternative.repeatRatio,
    avgPathDetourRatio: benchmark.metrics.pathsAlternative.avgPathDetourRatio,
    maxPathDetourRatio: benchmark.metrics.pathsAlternative.maxPathDetourRatio,
  }));
};

//we give the result of exportBenchmarkMetrics to get the stats
export const getMetricStats = (rows: Record<string, any>[]): MetricStats[] => {
  const numericKeys = Object.keys(rows[0]).filter(
    (key) => typeof rows[0][key] === "number",
  );

  return numericKeys.map((key): MetricStats => {
    const values = rows.map((r) => r[key]).sort((a, b) => a - b);

    const avg = values.reduce((sum, value) => sum + value, 0) / values.length;

    return {
      metric: key,
      min: round(values[0]),
      p5: round(percentile(values, 0.05)),
      p25: round(percentile(values, 0.25)),
      p50: round(percentile(values, 0.5)),
      avg: round(avg),
      p75: round(percentile(values, 0.75)),
      p95: round(percentile(values, 0.95)),
      max: round(values[values.length - 1]),
    };
  });
};

const percentile = (sortedValues: number[], percentile: number): number => {
  if (sortedValues.length === 0) return 0;

  const index = (sortedValues.length - 1) * percentile;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);

  if (lower === upper) {
    return sortedValues[lower];
  }

  const weight = index - lower;

  return sortedValues[lower] * (1 - weight) + sortedValues[upper] * weight;
};
