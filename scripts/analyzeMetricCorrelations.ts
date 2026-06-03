import { rawDataSelector } from "@/lib/maze/benchmark";
import { exportBenchmarkMetrics } from "@/lib/maze/benchmark/helpers";

//allow us check diderence in metrics, to check redunant metrics that doesn't aport value
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

const metrics = [
  "decisionPenalty",
  "difficulty",
  "ambiguity",
  "tortuosity",
  "deadEndBranchLength",
  "decisionBranchLength",
  "deadEndBranchCount",
  "decisionBranchCount",
] as const;

const analyzeMetricCorrelations = (
  mazeSize: keyof typeof rawDataSelector,
) => {
  const rows = exportBenchmarkMetrics(
    rawDataSelector[mazeSize],
  );

  console.log("\n====================================");
  console.log(`Maze Size: ${mazeSize}`);
  console.log("====================================");

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

analyzeMetricCorrelations("20*20");
analyzeMetricCorrelations("30*30");
analyzeMetricCorrelations("40*40");