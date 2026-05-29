import {
  CellMetric,
  BranchMetric,
  MazeDifficultyFeatures,
  PathsMetrics,
  MazeDifficultyResult,
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
    cell.branches.forEach((branch) => {
      features.ambiguity += branch.ambiguity;
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
): MazeDifficultyResult => {
  const scoreFeatures =
    mazeDifficultyFeatures.ambiguity +
    (mazeDifficultyFeatures.deadEndBranchLength /
      Math.max(1, mazeDifficultyFeatures.deadEndBranchCount)) *
      1.1 +
    (mazeDifficultyFeatures.decisionBranchLength /
      Math.max(1, mazeDifficultyFeatures.decisionBranchCount)) *
      0.5 +
    mazeDifficultyFeatures.decisionPenalty +
    mazeDifficultyFeatures.tortuosity;

  const scoreMetrics =
    pathsMetrics.maxTortuosity +
    pathsMetrics.minTortuosity +
    pathsMetrics.avgTortuosity +
    pathsMetrics.avgTurnDensity * 0.5 +
    pathsMetrics.shortestPathTurnDensity * 3;

  const score =
    (scoreFeatures + scoreMetrics * 1.3) / Math.sqrt(totalIntersections);

  return {
    mazeDifficultyFeatures,
    pathsMetrics,
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
