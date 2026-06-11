import { getBenchmarkMetricsRows } from "@/lib/maze/benchmark/helpers";
import { DATASET } from "./dataset.config";
import { BenchmarkMetricRow } from "@/lib/maze/benchmark/types";

export const featureMetrics = [
  "tortuosity",
  "deadEndBranchLength",
  "decisionBranchLength",
  "deadEndBranchCount",
  "decisionBranchCount",
] as const satisfies readonly (keyof BenchmarkMetricRow)[];

export const pathMetrics = [
  "avgTortuosity",
  "shortestPathTortuosity",
  "shortestPathLength",
  "shortestPathDecisionNodes",
] as const satisfies readonly (keyof BenchmarkMetricRow)[];

export const pathsFeatures = [
  "repeatRatio",
  "avgPathDetourRatio",
  "maxPathDetourRatio",
] as const satisfies readonly (keyof BenchmarkMetricRow)[];

export const derivedMetricsToAnalyze = [
  "avgDeadEndLength",
  "avgDecisionLength",
] as const satisfies readonly (keyof BenchmarkMetricRow)[];

export const tortuosityMetricsToAnalyze = [
  "tortuosity",
  "avgTortuosity",
  "avgDeadEndLength",
  "avgDecisionLength",
  "avgBranchTortuosity",
] as const satisfies readonly (keyof BenchmarkMetricRow)[];
export const cor = [
  "avgDecisionLength",
  "avgDeadEndLength",
  "avgTortuosity",
  "shortestPathTortuosity",
  "repeatRatio",
  "avgPathDetourRatio",
] as const satisfies readonly (keyof BenchmarkMetricRow)[];

export const correlation = (x: number[], y: number[]): number => {
  const n = x.length;

  if (n === 0) return 0;

  const avgX = x.reduce((a, b) => a + b, 0) / n;
  const avgY = y.reduce((a, b) => a + b, 0) / n;

  let numerator = 0;
  let denomX = 0;
  let denomY = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - avgX;
    const dy = y[i] - avgY;

    numerator += dx * dy;
    denomX += dx * dx;
    denomY += dy * dy;
  }

  if (denomX === 0 || denomY === 0) {
    return 0;
  }

  return numerator / Math.sqrt(denomX * denomY);
};

//any becase may be string or number
const analyzeMetricGroup = <T extends Record<string, any>>(
  title: string,
  rows: T[],
  metrics: readonly (keyof T)[],
) => {
  console.log(`\n${title}`);

  for (let i = 0; i < metrics.length; i++) {
    for (let j = i + 1; j < metrics.length; j++) {
      const metricA = metrics[i];
      const metricB = metrics[j];

      const value = correlation(
        rows.map((r) => r[metricA]),
        rows.map((r) => r[metricB]),
      );

      console.log(
        `${String(metricA)} ↔ ${String(metricB)}: ${value.toFixed(4)}`,
      );
    }
  }
};

const analyzeMetricCorrelations = (mazeSize: keyof typeof DATASET) => {
  const rows: BenchmarkMetricRow[] = getBenchmarkMetricsRows(DATASET[mazeSize]);

  console.log("\n====================================");
  console.log(`Maze Size: ${mazeSize}`);
  console.log("====================================");

  // analyzeMetricGroup("Features", rows, featureMetrics);
  analyzeMetricGroup("Path", rows, pathMetrics);
  // analyzeMetricGroup("Path Features", rows, pathsFeatures);
  // analyzeMetricGroup("Tortuosity", rows, tortuosityMetricsToAnalyze);

  //analyzeMetricGroup("cor", rows, cor);
};
analyzeMetricCorrelations("10*10");
analyzeMetricCorrelations("60*60");

analyzeMetricCorrelations("20*20");
analyzeMetricCorrelations("30*30");
analyzeMetricCorrelations("40*40");
