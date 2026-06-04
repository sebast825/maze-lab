import {
  PathsMetrics,
  MazeDifficultyFeatures,
  PathOverlapMetrics,
} from "../types";

export interface Weights {
  features: {
    ambiguity: number;
    deadEndAvg: number;
    decisionAvg: number;
    decisionPenalty: number;
    tortuosity: number;
    total: number;
  };

  paths: {
    avgTortuosity: number;
    avgTurnDensity: number;
    shortestPathTurnDensity: number;
    total: number;
  };

  overlaps: {
    uniqueCellCount: number;
    repeatedOccurrences: number;
    avgRedundantLength: number;
    maxRedundantLength: number;
    total: number;
  };

  global: {
    intersectionPenalty: number;
  };
}

export interface MazeDerivedFeatures {
  ambiguity: number;
  deadEndAvg: number;
  decisionAvg: number;
  decisionPenalty: number;
  tortuosity: number;
}

export interface MazeDerivedMetrics {
  features: MazeDerivedFeatures;
  paths: PathsMetrics;
  overlaps: {
    uniqueCellCount: number;
    repeatedOccurrences: number;
    avgRedundantLength: number;
    maxRedundantLength: number;
  };
}
export interface MazeRawMetrics {
  features: MazeDifficultyFeatures;
  paths: PathsMetrics;
  overlaps: PathOverlapMetrics;
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
  overlaps: number;
  total: number;
}

export type MazeWeightedMetrics = MazeDerivedMetrics;
