import { Position } from "../../types";
import { PathMetric, PathOverlapMetrics, PathsMetrics } from "../types";

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

export const computePathVariance = (paths: Position[][]): PathOverlapMetrics => {
  const cellFrequency = new Map<string, number>();

  paths.forEach((path) => {
    const uniqueCellsInPath = new Set<string>();

    path.forEach((pos) => {
      uniqueCellsInPath.add(`${pos.row},${pos.col}`);
    });
    uniqueCellsInPath.forEach((cellKey) => {
      cellFrequency.set(cellKey, (cellFrequency.get(cellKey) || 0) + 1);
    });
  });

  let repeatedCellCount = 0;
  let repeatedOccurrences = 0;
  let uniqueCellCount = 0;

  cellFrequency.forEach((count) => {
    if (count > 1) {
      repeatedCellCount++;
      repeatedOccurrences += count;
    } else {
      uniqueCellCount++;
    }
  });
  return {
    repeatedCellCount,
    repeatedOccurrences,
    uniqueCellCount,
  };
};