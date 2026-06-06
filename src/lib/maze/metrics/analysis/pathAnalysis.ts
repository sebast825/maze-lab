import { Position } from "../../types";
import { AlternativeRawPathMetrics } from "../scoring/types";
import { PathMetric, PathsMetrics } from "../types";
import { computeRepeatRatio } from "./computeRepeatRatio";

export const aggregatePathMetrics = (paths: PathMetric[]): PathsMetrics => {
  const tortuosities = paths.map((p) => p.tortuosity);
  const minPath: PathMetric = paths.reduce((prevPath, currentPath) => {
    return currentPath.path.length < prevPath.path.length
      ? currentPath
      : prevPath;
  });

  return {
    avgTortuosity: avg(tortuosities),
    shortestPathTortuosity: minPath.tortuosity,
  };
};
const avg = (arr: number[]) => arr.reduce((sum, v) => sum + v, 0) / arr.length;

export const computePathVariance = (
  paths: Position[][],
): AlternativeRawPathMetrics => {
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
  let uniqueCellCount = 0;

  cellFrequency.forEach((count) => {
    if (count > 1) repeatedCellCount++;
    else uniqueCellCount++;
  });
  const pathLengths = paths.map((p) => p.length);

  const shortestPath = Math.min(...pathLengths);
  const longestPath = Math.max(...pathLengths);

  const repeatRatio = computeRepeatRatio(paths);

  const avgPathDetourRatio =
    pathLengths.reduce((sum, len) => sum + (len - shortestPath), 0) /
    (pathLengths.length * Math.max(1, shortestPath));

  const maxPathDetourRatio =
    (longestPath - shortestPath) / Math.max(1, shortestPath);

  return {
    repeatRatio,
    avgPathDetourRatio,
    maxPathDetourRatio,
  };
};
