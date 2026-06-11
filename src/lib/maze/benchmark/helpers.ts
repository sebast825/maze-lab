import { BenchmarkMetricRow, MazeBenchmark } from "./types";

//get the metrics to a plan object

export const getBenchmarkMetricsRows = (
  benchmarks: MazeBenchmark[],
): BenchmarkMetricRow[] => {
     console.log(benchmarks[0].metrics.paths.shortestPathLength)
  return benchmarks.map((benchmark) => {
    const {
      tortuosity,
      deadEndBranchLength,
      decisionBranchLength,
      deadEndBranchCount,
      decisionBranchCount,
    } = benchmark.metrics.features;

    const { maxPathDetourRatio, avgPathDetourRatio, repeatRatio } =
      benchmark.metrics.pathsAlternative;

    const totalBranches = deadEndBranchCount + decisionBranchCount;

    const {
      shortestPathDecisionNodes,
      shortestPathTortuosity,
      avgTortuosity
      
      
    } = benchmark.metrics.paths;
 
    return {
      id: benchmark.id,
      name: benchmark.name,

      totalIntersections: benchmark.metrics.totalIntersections,
      totalPaths: benchmark.metrics.totalPaths,

      tortuosity: tortuosity,
      tortuosityFeatureAvg: tortuosity / totalBranches,
      deadEndBranchLength,
      decisionBranchLength,

      deadEndBranchCount,
      decisionBranchCount,

      totalBranches,
      shortestPathDecisionNodes,

      shortestPathLength: benchmark.metrics.paths.shortestPathLength,
      avgTortuosity,

      shortestPathTortuosity,
      repeatRatio,
      avgBranchTortuosity: totalBranches > 0 ? tortuosity / totalBranches : 0,

      avgDeadEndLength:
        deadEndBranchCount > 0 ? deadEndBranchLength / deadEndBranchCount : 0,

      avgDecisionLength:
        decisionBranchCount > 0
          ? decisionBranchLength / decisionBranchCount
          : 0,

      avgPathDetourRatio,
      maxPathDetourRatio,
    };
  });
};
