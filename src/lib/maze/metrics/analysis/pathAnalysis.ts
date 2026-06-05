import { Position } from "../../types";
import { PathMetric, PathOverlapMetrics, PathsMetrics } from "../types";

export const aggregatePathMetrics = (paths: PathMetric[]): PathsMetrics => {
  const tortuosities = paths.map((p) => p.tortuosity);
  const minPath: PathMetric = paths.reduce((prevPath, currentPath) => {
    return currentPath.path.length < prevPath.path.length
      ? currentPath
      : prevPath;
  });

  const turnDensities = paths.map((p) => p.turnDensity);
  return {
    avgTortuosity: avg(tortuosities),
    avgTurnDensity: avg(turnDensities),
    shortestPathTurnDensity: minPath.turnDensity,
  };
};
const avg = (arr: number[]) => arr.reduce((sum, v) => sum + v, 0) / arr.length;

export const computePathVariance = (
  paths: Position[][],
): PathOverlapMetrics => {
  console.log("entramos en variance")
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
  console.log(repeatedCellCount, uniqueCellCount);
  const pathLengths = paths.map((p) => p.length);

  const shortestPath = Math.min(...pathLengths);
  const longestPath = Math.max(...pathLengths);

  const totalCells = repeatedCellCount + uniqueCellCount;

  const repeatRatio = totalCells > 0 ? repeatedCellCount / totalCells : 0;

  const uniqueCellRatio = totalCells > 0 ? uniqueCellCount / totalCells : 0;

  const avgPathDetourRatio =
    pathLengths.reduce((sum, len) => sum + (len - shortestPath), 0) /
    (pathLengths.length * Math.max(1, shortestPath));

  const maxPathDetourRatio =
    (longestPath - shortestPath) / Math.max(1, shortestPath);
  console.log({
    repeatedCellCount,
    uniqueCellCount,
    totalCells,
    repeatRatio,
    uniqueCellRatio,
  });
  return {
    repeatRatio,
    avgPathDetourRatio,
    maxPathDetourRatio,
  };
};
