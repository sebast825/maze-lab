import { getBenchmarkMetricsRows } from "@/lib/maze/benchmark/helpers";
import { DATASET } from "./dataset.config";
import { saveMetricStats } from "@/lib/maze/benchmark/metricStats/saveMetrics";
import { getMetricStats } from "@/lib/maze/benchmark/metricStats/getMetrics";

const metricsToAnalyze = [
  "avgDeadEndLength",
  "avgDecisionLength",
  "tortuosityFeatureAvg",
  "avgTortuosity",
  "shortestPathTortuosity",
  "shortestPathDecisionAvg",
  "repeatRatio",
  "avgPathDetourRatio",
] as const;

const analyzeMetricCorrelations = (
  mazeSize: keyof typeof DATASET,
  file: string,
) => {
  const rows = getBenchmarkMetricsRows(DATASET[mazeSize]);

  console.log("\n====================================");
  console.log(`Maze Size: ${mazeSize}`);
  console.log("====================================");

  const selectedRows = rows.map((row) =>
    Object.fromEntries(metricsToAnalyze.map((metric) => [metric, row[metric]])),
  );

  const stats = getMetricStats(selectedRows);

  const fileName = `${file}-stats.json`;

  saveMetricStats(
    `./src/lib/maze/benchmark/rawData/generated/${fileName}`,
    stats,
  );

  console.log(`Generated ${stats.length} metric to analize -> ${fileName}`);
};

analyzeMetricCorrelations("10*10", "10x10");
analyzeMetricCorrelations("20*20", "20x20");

analyzeMetricCorrelations("30*30", "30x30");

analyzeMetricCorrelations("40*40", "40x40");

 analyzeMetricCorrelations("60*60", "60x60");
