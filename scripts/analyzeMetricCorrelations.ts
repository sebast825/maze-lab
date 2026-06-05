import {
  rawDataGeneratedSelector,
  rawDataManualSelector,
} from "@/lib/maze/benchmark";
import { exportBenchmarkMetrics } from "@/lib/maze/benchmark/helpers";

// --- Dataset Configuration  ---
//const DATASET = rawDataGeneratedSelector;
 const DATASET = rawDataManualSelector;

const featureMetrics = [
  "decisionPenalty",
  "tortuosity",
  "deadEndBranchLength",
  "decisionBranchLength",
  "deadEndBranchCount",
  "decisionBranchCount",
] as const;

const pathMetrics = [
  "avgTurnDensity",
  "shortestPathTurnDensity",
] as const;
const overlapPathsMetrics = [
  "repeatRatio",
  "avgPathDetourRatio",
   "maxPathDetourRatio"
] as const;

type RawMetricKey = (typeof featureMetrics)[number] | (typeof pathMetrics)[number] | (typeof overlapPathsMetrics)[number];
type RawMetricRow = { [K in RawMetricKey]: number };

const derivedMetrics = [
  "avgDecisionPenalty",
  "avgDeadEndLength",
  "avgDecisionLength",
  "tortuosity",
] as const;

type DerivedMetricKey = (typeof derivedMetrics)[number];
type DerivedMetricRow = { [K in DerivedMetricKey]: number };

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

  if (denomX === 0 || denomY === 0) return 0;

  return numerator / Math.sqrt(denomX * denomY);
};

const analyzeMetricGroup = (
  title: string,
  rows: RawMetricRow[],
  metrics: readonly RawMetricKey[],
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

      console.log(`${metricA} ↔ ${metricB}: ${value.toFixed(4)}`);
    }
  }
};

const analyzeDerivedMetrics = (rows: RawMetricRow[]) => {
  const derivedRows: DerivedMetricRow[] = rows.map((r) => {
    const totalBranches = r.deadEndBranchCount + r.decisionBranchCount;

    return {
      avgDecisionPenalty: totalBranches > 0 ? r.decisionPenalty / totalBranches : 0,
      avgDeadEndLength: r.deadEndBranchCount > 0 ? r.deadEndBranchLength / r.deadEndBranchCount : 0,
      avgDecisionLength: r.decisionBranchCount > 0 ? r.decisionBranchLength / r.decisionBranchCount : 0,
      tortuosity: r.tortuosity,
    };
  });

  console.log("\nDerived Metrics");

  for (let i = 0; i < derivedMetrics.length; i++) {
    for (let j = i + 1; j < derivedMetrics.length; j++) {
      const metricA = derivedMetrics[i];
      const metricB = derivedMetrics[j];

      const value = correlation(
        derivedRows.map((r) => r[metricA]),
        derivedRows.map((r) => r[metricB]),
      );

      console.log(`${metricA} ↔ ${metricB}: ${value.toFixed(4)}`);
    }
  }
};


const analyzeMetricCorrelations = (mazeSize: keyof typeof DATASET) => {
  const rows = exportBenchmarkMetrics(DATASET[mazeSize]) as RawMetricRow[];

  console.log("\n====================================");
  console.log(`Maze Size: ${mazeSize}`);
  console.log("====================================");

    analyzeMetricGroup("Overlap Metrics", rows, overlapPathsMetrics);

  /*
  analyzeMetricGroup("Feature Metrics", rows, featureMetrics);
  analyzeMetricGroup("Path Metrics", rows, pathMetrics);
  analyzeDerivedMetrics(rows);*/
};


analyzeMetricCorrelations("20*20");
analyzeMetricCorrelations("30*30");
analyzeMetricCorrelations("40*40");