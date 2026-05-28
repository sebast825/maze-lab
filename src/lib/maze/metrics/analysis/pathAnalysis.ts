import { PathMetric, PathsMetrics } from "../types";

export const aggregatePathMetrics = (paths: PathMetric[]): PathsMetrics => {
  const tortuosities = paths.map((p) => p.tortuosity);

  return {
    avgTortuosity: avg(tortuosities),
    minTortuosity: Math.min(...tortuosities),
    maxTortuosity: Math.max(...tortuosities),
    pathVariance: 0,
  };
};
const avg = (arr: number[]) => arr.reduce((sum, v) => sum + v, 0) / arr.length;