import {
  rawDataGeneratedSelector,
  rawDataManualSelector,
} from "@/lib/maze/benchmark";
import { exportBenchmarkMetrics } from "@/lib/maze/benchmark/helpers";

export const correlation = (
  x: number[],
  y: number[],
): number => {
  const n = x.length;

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

  return numerator / Math.sqrt(denomX * denomY);
};

const featureMetrics = [
  "decisionPenalty",
  "difficulty",
  "ambiguity",
  "tortuosity",
  "deadEndBranchLength",
  "decisionBranchLength",
  "deadEndBranchCount",
  "decisionBranchCount",
] as const;

const pathMetrics = [
  "avgTortuosity",
  "maxTortuosity",
  "minTortuosity",
  "avgTurnDensity",
  "shortestPathTurnDensity",
] as const;

type MetricKey =
  | (typeof featureMetrics)[number]
  | (typeof pathMetrics)[number];

type MetricRow = {
  [K in MetricKey]: number;
};

const DATASET = rawDataGeneratedSelector;
// const DATASET = rawDataManualSelector;

const analyzeMetricGroup = (
  title: string,
  rows: MetricRow[],
  metrics: readonly MetricKey[],
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
        `${metricA} ↔ ${metricB}: ${value.toFixed(4)}`,
      );
    }
  }
};

const analyzeMetricCorrelations = (
  mazeSize: keyof typeof DATASET,
) => {
  const rows = exportBenchmarkMetrics(
    DATASET[mazeSize],
  ) as MetricRow[];

  console.log("\n====================================");
  console.log(`Maze Size: ${mazeSize}`);
  console.log("====================================");

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
};

analyzeMetricCorrelations("20*20");
analyzeMetricCorrelations("30*30");
analyzeMetricCorrelations("40*40");