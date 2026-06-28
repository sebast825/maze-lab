import fs from "fs";
import { MetricStats } from "../types";

export const saveMetricStats = (
  filePath: string,
  stats: MetricStats[],
) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(
      stats,
      null,
      2,
    ),
  );
};