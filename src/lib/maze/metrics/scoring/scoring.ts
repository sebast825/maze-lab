import { CellMetric, BranchMetric, MazeDifficultyFeatures } from "../types";
import {
  MazeDerivedMetrics,
  MazeRawMetrics,
  MazeScores,
  MazeScoringResult,
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
  };
  cellsMetric.forEach((cell) => {
    features.ambiguity += cell.ambiguity;

    cell.branches.forEach((branch) => {
      features.decisionPenalty += branch.decisionPenalty;
      features.tortuosity += branch.tortuosity;
      if (branch.branchLengthPenalty.endedBy == "dead-end") {
        features.deadEndBranchLength += branch.branchLengthPenalty.branchLength;
        features.deadEndBranchCount++;
      }
      if (branch.branchLengthPenalty.endedBy == "decision") {
        features.decisionBranchLength +=
          branch.branchLengthPenalty.branchLength;
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
    branch.decisionPenalty * branch.branchLengthPenalty.branchLength;
  return { ...branch, branchDifficulty };
};
export const analyzeMaze = (
  raw: MazeRawMetrics,
  weights: Weights,
): MazeScoringResult => {
  const derived = deriveMazeMetrics(raw);
  const scores = calculateMazeScore(derived, raw, weights);

  return {
    raw,
    derived,
    scores,
  };
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
    },

    paths: raw.paths,

    overlaps: {
      uniqueCellCount: raw.overlaps.uniqueCellCount,
      repeatedOccurrences: raw.overlaps.repeatedOccurrences,
    },
  };
};

const calculateMazeScore = (
  derived: MazeDerivedMetrics,
  raw: MazeRawMetrics,
  weights: Weights,
): MazeScores => {
  const scoreFeatures =
    derived.features.ambiguity * weights.features.ambiguity +
    derived.features.deadEndAvg * weights.features.deadEndAvg +
    derived.features.decisionAvg * weights.features.decisionAvg +
    derived.features.decisionPenalty * weights.features.decisionPenalty +
    derived.features.tortuosity * weights.features.tortuosity;

  const scorePaths =
    derived.paths.maxTortuosity * weights.paths.maxTortuosity +
    derived.paths.minTortuosity * weights.paths.minTortuosity +
    derived.paths.avgTortuosity * weights.paths.avgTortuosity +
    derived.paths.avgTurnDensity * weights.paths.avgTurnDensity +
    derived.paths.shortestPathTurnDensity *
      weights.paths.shortestPathTurnDensity;

  const scoreOverlaps =
    derived.overlaps.uniqueCellCount * weights.overlaps.uniqueCellCount -
    derived.overlaps.repeatedOccurrences * weights.overlaps.repeatedOccurrences;

  const total =
    (scoreFeatures * weights.features.total +
      scorePaths * weights.paths.total +
      scoreOverlaps * weights.overlaps.total) /
    (Math.sqrt(raw.totalIntersections) * weights.global.intersectionPenalty);

  return {
    features: scoreFeatures,
    paths: scorePaths,
    overlaps: scoreOverlaps,
    total: Number(total.toFixed(2)),
  };
};
