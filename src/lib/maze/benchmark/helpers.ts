import { BenchmarkMetricRow, MazeBenchmark } from "./types";

//get the metrics to a plan object

export const getBenchmarkMetricsRows = (
  benchmarks: MazeBenchmark[],
): BenchmarkMetricRow[] => {
  return benchmarks.map((benchmark) => {
    const {
      tortuosity,
      deadEndBranchLength,
      decisionBranchLength,
      deadEndBranchCount,
      decisionBranchCount,
    } = benchmark.metrics.features;

    const totalBranches = deadEndBranchCount + decisionBranchCount;

    return {
      id: benchmark.id,
      name: benchmark.name,

      totalIntersections: benchmark.metrics.totalIntersections,
      totalPaths: benchmark.metrics.totalPaths,
      shortestPathLength: benchmark.metrics.shortestPathLength,

      tortuosity: tortuosity,
      tortuosityFeatureAvg: tortuosity / totalBranches,

      deadEndBranchLength,
      decisionBranchLength,

      deadEndBranchCount,
      decisionBranchCount,

      totalBranches,

      avgBranchTortuosity: totalBranches > 0 ? tortuosity / totalBranches : 0,

      avgDeadEndLength:
        deadEndBranchCount > 0 ? deadEndBranchLength / deadEndBranchCount : 0,

      avgDecisionLength:
        decisionBranchCount > 0
          ? decisionBranchLength / decisionBranchCount
          : 0,

      avgTortuosity: benchmark.metrics.paths.avgTortuosity,

      shortestPathTortuosity: benchmark.metrics.paths.shortestPathTortuosity,

      repeatRatio: benchmark.metrics.pathsAlternative.repeatRatio,

      avgPathDetourRatio: benchmark.metrics.pathsAlternative.avgPathDetourRatio,

      maxPathDetourRatio: benchmark.metrics.pathsAlternative.maxPathDetourRatio,
    };
  });
};
