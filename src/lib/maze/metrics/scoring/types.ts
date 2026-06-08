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
    tortuosity: number;
  };
  paths: PathsMetrics;

  pathsAlternative: AlternativePathMetrics;
};

export interface AlternativePathMetrics {
  /* Average pairwise Jaccard similarity between all solution paths.
   *
   * Measures how structurally similar paths are in terms of shared cells.
   *
   * - 0   => completely independent paths (no overlap)
   * - 1   => identical paths
   *
   * Higher values indicate stronger convergence towards the same routes
   * (less path diversity / more shared backbone).
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
