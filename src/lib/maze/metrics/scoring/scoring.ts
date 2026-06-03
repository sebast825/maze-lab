import { CellMetric, BranchMetric, MazeDifficultyFeatures } from "../types";
import {
  MazeDerivedMetrics,
  MazeRawMetrics,
  MazeScoringResult,
  MazeWeightedMetrics,
  Weights,
} from "./types";

export const aggregateBranchMetrics = (
  cellsMetric: CellMetric[],
): MazeDifficultyFeatures => {
  const features: MazeDifficultyFeatures = {
    decisionPenalty: 0,
    ambiguity: 0,
    tortuosity: 0,
    deadEndBranchLength: 0,
    decisionBranchLength: 0,
    deadEndBranchCount: 0,
    decisionBranchCount: 0,
    difficulty: 0,
  };
  cellsMetric.forEach((cell) => {
    features.ambiguity += cell.ambiguity;
    features.difficulty += cell.nodeDifficulty;

    cell.branches.forEach((branch) => {
      features.decisionPenalty += branch.decisionPenalty;
      features.tortuosity += branch.tortuosity;
      if (branch.branchAnalysis.endedBy == "dead-end") {
        features.deadEndBranchLength += branch.branchAnalysis.branchLength;
        features.deadEndBranchCount++;
      }
      if (branch.branchAnalysis.endedBy == "decision") {
        features.decisionBranchLength +=
          branch.branchAnalysis.branchLength;
        features.decisionBranchCount++;
      }
    });
  });

  return features;
};

export const calculateBranchDifficulty = (
  branch: BranchMetric,
): BranchMetric => {
  const branchDifficulty =
    branch.decisionPenalty * branch.branchAnalysis.branchLength;
  return { ...branch, branchDifficulty };
};
export const analyzeMaze = (
  raw: MazeRawMetrics,
  weights: Weights,
): MazeScoringResult => {
  const derived = deriveMazeMetrics(raw);
  const scores: MazeScoringResult = calculateMazeScore(derived, raw, weights);

  return scores;
};
const deriveMazeMetrics = (raw: MazeRawMetrics): MazeDerivedMetrics => {
  const deadEndAvg =
    raw.features.deadEndBranchLength /
    Math.max(1, raw.features.deadEndBranchCount);

  const decisionAvg =
    raw.features.decisionBranchLength /
    Math.max(1, raw.features.decisionBranchCount);

  return {
    features: {
      ambiguity: raw.features.ambiguity,
      deadEndAvg,
      decisionAvg,
      decisionPenalty: raw.features.decisionPenalty,
      tortuosity: raw.features.tortuosity,
      difficulty: raw.features.difficulty,
    },

    paths: raw.paths,

    overlaps: {
      uniqueCellCount: raw.overlaps.uniqueCellCount,
      repeatedOccurrences: raw.overlaps.repeatedOccurrences,
      avgRedundantLength: raw.overlaps.avgRedundantLength,
      maxRedundantLength: raw.overlaps.maxRedundantLength,
    },
  };
};

const calculateMazeScore = (
  derived: MazeDerivedMetrics,
  raw: MazeRawMetrics,
  weights: Weights,
): MazeScoringResult => {
  const weighted: MazeWeightedMetrics = {
    features: {
      ambiguity: derived.features.ambiguity * weights.features.ambiguity,
      deadEndAvg: derived.features.deadEndAvg * weights.features.deadEndAvg,
      decisionAvg: derived.features.decisionAvg * weights.features.decisionAvg,
      decisionPenalty:
        derived.features.decisionPenalty * weights.features.decisionPenalty,
      tortuosity: derived.features.tortuosity * weights.features.tortuosity,
      difficulty: derived.features.difficulty * weights.features.difficulty,
    },

    paths: {
      maxTortuosity: derived.paths.maxTortuosity * weights.paths.maxTortuosity,
      minTortuosity: derived.paths.minTortuosity * weights.paths.minTortuosity,
      avgTortuosity: derived.paths.avgTortuosity * weights.paths.avgTortuosity,
      avgTurnDensity:
        derived.paths.avgTurnDensity * weights.paths.avgTurnDensity,
      shortestPathTurnDensity:
        derived.paths.shortestPathTurnDensity *
        weights.paths.shortestPathTurnDensity,
      pathVariance: derived.paths.pathVariance,
    },

    overlaps: {
      uniqueCellCount:
        derived.overlaps.uniqueCellCount * weights.overlaps.uniqueCellCount,
      repeatedOccurrences:
        derived.overlaps.repeatedOccurrences *
        weights.overlaps.repeatedOccurrences,
      avgRedundantLength:
        derived.overlaps.avgRedundantLength *
        weights.overlaps.avgRedundantLength,
      maxRedundantLength:
        derived.overlaps.maxRedundantLength *
        weights.overlaps.maxRedundantLength,
    },
  };
  const scoreFeatures =
    weighted.features.ambiguity +
    weighted.features.deadEndAvg +
    weighted.features.decisionAvg +
    weighted.features.decisionPenalty +
    weighted.features.tortuosity +
    weighted.features.difficulty;

  const scorePaths =
    weighted.paths.maxTortuosity +
    weighted.paths.minTortuosity +
    weighted.paths.avgTortuosity +
    weighted.paths.avgTurnDensity +
    weighted.paths.shortestPathTurnDensity;

  const scoreOverlaps =
    weighted.overlaps.uniqueCellCount -
    weighted.overlaps.repeatedOccurrences +
    weighted.overlaps.avgRedundantLength +
    weighted.overlaps.maxRedundantLength;

  let totalFeatures = scoreFeatures * weights.features.total;
  let totalScores = scorePaths * weights.paths.total;
  let totalOverlaps = scoreOverlaps * weights.overlaps.total;
  const total =
    (totalFeatures + totalScores + totalOverlaps) /
    (Math.sqrt(raw.totalIntersections) * weights.global.intersectionPenalty);

  return {
    raw,
    derived,
    weighted,
    scores: {
      features: totalFeatures,
      paths: totalScores,
      overlaps: totalOverlaps,
      total,
    },
  };
};
