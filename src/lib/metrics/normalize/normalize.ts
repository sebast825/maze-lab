import { MazeDerivedMetrics } from "../scoring/types";
import { MazeSizeSpecs } from "./mazeSizeSpecs";
import { MazeNormalizedMetrics, MazeSizeSpecKey, MetricLimits } from "./types";

function normalize(value: number, limits: MetricLimits): number {
  const { p5, p95 } = limits;
  // Prevent division by zero if percentiles are identical
  if (p95 === p5) return 0;
  // Winsorize: Clamp outliers to protect the final score from extreme values
  const clamped = Math.max(p5, Math.min(p95, value));
  // Pure MinMax scaling over the clamped range
  return (clamped - p5) / (p95 - p5);
}

export const getNormalizedMetrics = (
  derived: MazeDerivedMetrics,
  sizeKey: MazeSizeSpecKey,
): MazeNormalizedMetrics => {
  const specs = MazeSizeSpecs[sizeKey];

  return {
    features: {
      deadEndAvg: normalize(derived.features.deadEndAvg, specs.deadEndAvg),
      decisionEndAvg: normalize(
        derived.features.decisionEndAvg,
        specs.decisionEndAvg,
      ),
      tortuosityAvg: normalize(
        derived.features.tortuosityAvg,
        specs.tortuosityFeatureAvg,
      ),
    },
    paths: {
      shortestPathTortuosity: normalize(
        derived.paths.shortestPathTortuosity,
        specs.shortestPathTortuosity,
      ),
      shortestPathLength: normalize(
        derived.paths.shortestPathLength,
        specs.shortestPathLength,
      ),
      shortestPathDecisionNodes: normalize(
        derived.paths.shortestPathDecisionNodes,
        specs.shortestPathDecisionNodes,
      ),
      /**
       * INVERSION: The higher the shortestPathWallRatio, the easier the maze.
       * Paths that stay close to the maze border are generally easier to track.
       */
      shortestPathWallRatio:
        1 -
        normalize(
          derived.paths.shortestPathWallRatio,
          specs.shortestPathWallRatio,
        ),
    },
    pathsAlternative: {
      /**
       * INVERSION: The higher the repeatRatio, the easier the maze.
       * By doing (1.0 - normalized), we transform it into a difficulty metric.
       * * EXAMPLES (After Inversion):
       * - "The Safety Net" (Easy):   Raw repeatRatio 0.90 -> Inverted to 0.10 (Low Difficulty)
       * - "The Mirage" (Med-Hard):   Raw repeatRatio 0.80 -> Inverted to 0.20 (Mid Difficulty)
       * - "The Strict Path" (Hard):  Raw repeatRatio 0.15 -> Inverted to 0.85 (High Difficulty)
       */
      repeatRatio:
        1.0 -
        normalize(derived.pathsAlternative.repeatRatio, specs.repeatRatio),
      avgPathDetourRatio: normalize(
        derived.pathsAlternative.avgPathDetourRatio,
        specs.avgPathDetourRatio,
      ),
    },
  };
};
