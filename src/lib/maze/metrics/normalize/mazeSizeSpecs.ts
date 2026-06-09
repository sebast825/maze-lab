import { MazeSizeSpecKey, MetricLimits } from "./types";


/**
 * Maps the total cell count to the closest available benchmark size specification.
 */
export const getClosestSizeKey = (totalCells: number): MazeSizeSpecKey => {
  const sizeMap: Record<MazeSizeSpecKey, number> = {
    "10x10": 100,
    "20x20": 400,
    "30x30": 900,
    "40x40": 1600,
    "60x60": 3600,
  };
  return (Object.entries(sizeMap) as [MazeSizeSpecKey, number][]).reduce(
    (closest, [key, cells]) => {
      return Math.abs(cells - totalCells) <
        Math.abs(sizeMap[closest] - totalCells)
        ? key
        : closest;
    },
    "10x10" as MazeSizeSpecKey,
  );
};
export const MazeSizeSpecs: Record<MazeSizeSpecKey, Record<string, MetricLimits>> = {
  "10x10": {
    deadEndAvg: { p5: 1.53, p95: 4.5 },
    decisionEndAvg: { p5: 1.59, p95: 6.64 },
    tortuosity: { p5: 2.35, p95: 9.44 },
    avgTortuosity: { p5: 0.34, p95: 0.66 },
    shortestPathTortuosity: { p5: 0.29, p95: 0.67 },
    repeatRatio: { p5: 0.14, p95: 0.91 },
    avgPathDetourRatio: { p5: 0.0, p95: 0.46 },
  },
  "20x20": {
    deadEndAvg: { p5: 1.64, p95: 3.49 },
    decisionEndAvg: { p5: 1.68, p95: 7.51 },
    tortuosity: { p5: 10.51, p95: 38.46 },
    avgTortuosity: { p5: 0.41, p95: 0.66 },
    shortestPathTortuosity: { p5: 0.38, p95: 0.67 },
    repeatRatio: { p5: 0.15, p95: 0.8 },
    avgPathDetourRatio: { p5: 0.01, p95: 0.42 },
  },
  "30x30": {
    deadEndAvg: { p5: 1.64, p95: 3.51 },
    decisionEndAvg: { p5: 1.71, p95: 7.57 },
    tortuosity: { p5: 24.29, p95: 89.47 },
    avgTortuosity: { p5: 0.43, p95: 0.65 },
    shortestPathTortuosity: { p5: 0.4, p95: 0.66 },
    repeatRatio: { p5: 0.3, p95: 0.55 },
    avgPathDetourRatio: { p5: 0.18, p95: 0.93 },
  },
  "40x40": {
    deadEndAvg: { p5: 1.65, p95: 3.4 },
    decisionEndAvg: { p5: 1.74, p95: 7.63 },
    tortuosity: { p5: 47.13, p95: 158.93 },
    avgTortuosity: { p5: 0.43, p95: 0.64 },
    shortestPathTortuosity: { p5: 0.41, p95: 0.65 },
    repeatRatio: { p5: 0.31, p95: 0.51 },
    avgPathDetourRatio: { p5: 0.29, p95: 1.11 },
  },
  "60x60": {
    deadEndAvg: { p5: 1.66, p95: 3.4 },
    decisionEndAvg: { p5: 1.75, p95: 7.85 },
    tortuosity: { p5: 105.58, p95: 355.92 },
    avgTortuosity: { p5: 0.45, p95: 0.64 },
    shortestPathTortuosity: { p5: 0.43, p95: 0.64 },
    repeatRatio: { p5: 0.31, p95: 0.5 },
    avgPathDetourRatio: { p5: 0.34, p95: 1.01 },
  },
};
