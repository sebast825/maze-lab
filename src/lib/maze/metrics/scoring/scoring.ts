import path from "path";
import {
  CellMetric,
  BranchMetric,
  MazeDifficultyFeatures,
  PathsMetrics,
  MazeDifficultyResult,
  PathOverlapMetrics,
} from "../types";
import { defaultWeights } from "./defaultWeights";
import { Weights } from "./types";

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

export const calculateMazeDifficulty = (
  totalIntersections: number,
  mazeDifficultyFeatures: MazeDifficultyFeatures,
  pathsMetrics: PathsMetrics,
  shortestPathLength: number,
  totalPaths: number,
  pathOverlapsMetrics: PathOverlapMetrics,
  customWeights?: Weights,
): MazeDifficultyResult => {
  const weights: Weights = customWeights ? customWeights : defaultWeights;
  const scoreFeatures =
    mazeDifficultyFeatures.ambiguity * weights.features.ambiguity +
    (mazeDifficultyFeatures.deadEndBranchLength /
      Math.max(1, mazeDifficultyFeatures.deadEndBranchCount)) *
      weights.features.averageDeadEndCost +
    (mazeDifficultyFeatures.decisionBranchLength /
      Math.max(1, mazeDifficultyFeatures.decisionBranchCount)) *
      weights.features.averageDecisionCost +
    mazeDifficultyFeatures.decisionPenalty * weights.features.decisionPenalty +
    mazeDifficultyFeatures.tortuosity * weights.features.tortuosity;

  const scorePaths =
    pathsMetrics.maxTortuosity * weights.paths.maxTortuosity +
    pathsMetrics.minTortuosity * weights.paths.minTortuosity +
    pathsMetrics.avgTortuosity * weights.paths.avgTortuosity +
    pathsMetrics.avgTurnDensity * weights.paths.avgTurnDensity +
    pathsMetrics.shortestPathTurnDensity *
      weights.paths.shortestPathTurnDensity;
  const scorepathOverlaps =
    pathOverlapsMetrics.uniqueCellCount * weights.pathOverlaps.uniqueCellCount -
    pathOverlapsMetrics.repeatedOccurrences *
      weights.pathOverlaps.repeatedOccurrences;
  const score =
    (scoreFeatures * weights.features.total +
      scorePaths * weights.paths.total +
      scorepathOverlaps * weights.pathOverlaps.total) /
    (Math.sqrt(totalIntersections) * weights.totalIntersections);
  return {
    mazeDifficultyFeatures,
    pathsMetrics,
    pathOverlapsMetrics,
    score: Number(score.toFixed(2)),
    shortestPathLength,
    totalPaths,
    totalIntersections,
  };
};

export const calculateBranchDifficulty = (
  branch: BranchMetric,
): BranchMetric => {
  const branchDifficulty =
    branch.decisionPenalty * branch.branchLengthPenalty.branchLength;
  return { ...branch, branchDifficulty };
};
