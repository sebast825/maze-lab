import {
  PathsMetrics,
  MazeDifficultyFeatures,
  PathOverlapMetrics,
} from "../types";

export interface Weights {
  features: {
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
  overlaps: {
    uniqueCellCount: number;
    repeatedOccurrences: number;
    avgRedundantLength: number;
    maxRedundantLength: number;
  };
};
