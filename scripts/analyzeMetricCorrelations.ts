import { exportBenchmarkMetrics } from "@/lib/maze/benchmark/helpers";
import { DATASET } from "./dataset.config";

const featureMetrics = [
  "decisionPenalty",
  "tortuosity",
  "deadEndBranchLength",
  "decisionBranchLength",
  "deadEndBranchCount",
  "decisionBranchCount",
] as const;

const pathMetrics = ["avgTurnDensity", "shortestPathTurnDensity"] as const;

const pathsFeatures = [
  "repeatRatio",
  "avgPathDetourRatio",
  "maxPathDetourRatio",
] as const;

type RawMetricKey =
  | (typeof featureMetrics)[number]
  | (typeof pathMetrics)[number]
  | (typeof pathsFeatures)[number];

type RawMetricRow = Record<RawMetricKey, number>;

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

const analyzeMetricGroup = <T extends Record<string, number>>(
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

const buildAndAnalizeDerivedRows = (rows: RawMetricRow[]) => {
  const derivedRows = rows.map((r) => {
    const totalBranches = r.deadEndBranchCount + r.decisionBranchCount;

    return {
      avgDecisionPenalty:
        totalBranches > 0 ? r.decisionPenalty / totalBranches : 0,

      avgDeadEndLength:
        r.deadEndBranchCount > 0
          ? r.deadEndBranchLength / r.deadEndBranchCount
          : 0,

      avgDecisionLength:
        r.decisionBranchCount > 0
          ? r.decisionBranchLength / r.decisionBranchCount
          : 0,
    };
  });
  analyzeMetricGroup("Derived Metrics", derivedRows, [
    "avgDecisionPenalty",
    "avgDeadEndLength",
    "avgDecisionLength",
  ] as const);
};

const analyzeMetricCorrelations = (mazeSize: keyof typeof DATASET) => {
  const rows = exportBenchmarkMetrics(DATASET[mazeSize]) as RawMetricRow[];

  console.log("\n====================================");
  console.log(`Maze Size: ${mazeSize}`);
  console.log("====================================");
  /*
  analyzeMetricGroup(
    "Feature Metrics",
    rows,
    featureMetrics,
  );

  analyzeMetricGroup(
    "Path Metrics",
    rows,
    pathMetrics,
  );

  analyzeMetricGroup(
    "Overlap Metrics",
    rows,
    pathsFeatures,
  );

  const derivedRows = buildAndAnalizeDerivedRows(rows);

 
  );*/

  buildAndAnalizeDerivedRows(rows);
};

analyzeMetricCorrelations("20*20");
analyzeMetricCorrelations("30*30");
analyzeMetricCorrelations("40*40");
