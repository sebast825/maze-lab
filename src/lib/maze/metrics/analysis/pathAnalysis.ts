import { PathMetric, PathsMetrics } from "../types";

export const aggregatePathMetrics = (paths: PathMetric[]): PathsMetrics => {
  const tortuosities = paths.map((p) => p.tortuosity);
  const minPath: PathMetric = paths.reduce((prevPath, currentPath) => {
    return currentPath.path.length < prevPath.path.length
      ? currentPath
      : prevPath;
  });

  const turnDensities  = paths.map((p) => p.turnDensity)
    return {
    avgTortuosity: avg(tortuosities),
    minTortuosity: Math.min(...tortuosities),
    maxTortuosity: Math.max(...tortuosities),
    pathVariance: 0,
    avgTurnDensity :avg(turnDensities ),
    shortestPathTurnDensity: minPath.turnDensity
  };
};
const avg = (arr: number[]) => arr.reduce((sum, v) => sum + v, 0) / arr.length;
