import { CellMetric, BranchMetric, MazeDifficultyFeatures, PathsMetrics } from "./types";

export const aggregateBranchMetrics = (
  cellsMetric: CellMetric[],
): MazeDifficultyFeatures => {
  const features: MazeDifficultyFeatures = {
    decisionPenalty: 0,
    branchLength: 0,
    ambiguity: 0,
    tortuosity: 0,
  };
  cellsMetric.forEach((metric) => {
    metric.branches.forEach((branch) => {
      features.ambiguity += branch.ambiguity;
      features.decisionPenalty += branch.decisionPenalty;
      features.branchLength += branch.branchLengthPenalty.branchLength;
      features.tortuosity += branch.tortuosity;
    });
  });
  
  return features;
};

export const calculateMazeDifficulty = (
  totalIntersections: number,
  mazeDifficultyFeatures: MazeDifficultyFeatures,
  pathsMetrics: PathsMetrics 
): number => {
  let scoreFeatures : number = mazeDifficultyFeatures.ambiguity + mazeDifficultyFeatures.branchLength + mazeDifficultyFeatures.decisionPenalty + mazeDifficultyFeatures.tortuosity
let scoreMetrics :number = pathsMetrics.maxTortuosity + pathsMetrics.minTortuosity


  const score = (scoreFeatures+scoreMetrics) / totalIntersections;
 return Number(score.toFixed(2));
};

export const calculateBranchDifficulty = (
  branch: BranchMetric,
): BranchMetric => {
  const branchDifficulty =
    branch.decisionPenalty * branch.branchLengthPenalty.branchLength;
  return { ...branch, branchDifficulty };
};


