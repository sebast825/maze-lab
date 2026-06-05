import { PathsMetrics, MazeDifficultyFeatures } from "../types";

export interface Weights {
  features: MazeDerivedFeatures & {
    total: number;
  };

  paths: {
    avgTortuosity: number;
    avgTurnDensity: number;
    shortestPathTurnDensity: number;
    total: number;
  };

  pathsAlternative: AlternativePathMetrics & {
    total: number;
  };

  global: {
    intersectionPenalty: number;
  };
}

export interface MazeDerivedFeatures {
  deadEndAvg: number;
  decisionEndAvg: number;
  decisionPenalty: number;
  tortuosity: number;
}

export interface MazeDerivedMetrics {
  features: MazeDerivedFeatures;
  paths: PathsMetrics;
  pathsAlternative: AlternativePathMetrics;
}
export interface MazeRawMetrics {
  features: MazeDifficultyFeatures;
  paths: PathsMetrics;
  pathsAlternative: AlternativeRawPathMetrics;
  totalIntersections: number;
  shortestPathLength: number;
  totalPaths: number;
}

export interface MazeScoringResult {
  raw: MazeRawMetrics;
  derived: MazeDerivedMetrics;
  weighted: MazeWeightedMetrics;
  scores: MazeScores;
}

export interface MazeScores {
  features: number;
  paths: number;
  pathsAlternative: number;
  total: number;
}

export type MazeWeightedMetrics = {
  features: {
    deadEndAvg: number;

    decisionAvg: number;
    // decisionPenalty / totalBranches
    // average penalty per decision branch (normalizes total penalty by number of choices)
    decisionPenaltyAvg: number;
    tortuosity: number;
  };
  paths: PathsMetrics;

  pathsAlternative: AlternativePathMetrics;
};

export interface AlternativePathMetrics {
  /**
   * Ratio of total path cell usage that overlaps with other paths.
   * Normalized measure of how much solutions reuse the same space.
   *
   * Interpretation:
   * - high → strong shared backbone / constrained solution space
   * - low → diverse, independent paths
   */
  repeatRatio: number;

  /**
   * how costly it is to choose an alternative route
   *
   * Interpretation:
   * - 0 → all paths are optimal
   * - higher → more detours required on average
   */
  avgPathDetourRatio: number;
}
export interface AlternativeRawPathMetrics extends AlternativePathMetrics {
  /**
   * Worst-case extra cost compared to shortest path.
   * Captures extreme difficulty spikes in solution space.
   *
   * Interpretation:
   * - high → some paths are significantly misleading
   * - low → all solutions are similarly efficient
   */
  maxPathDetourRatio: number;
}
