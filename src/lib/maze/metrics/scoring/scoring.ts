import { Repeat } from "lucide-react";
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

    tortuosity: 0,
    deadEndBranchLength: 0,
    decisionBranchLength: 0,
    deadEndBranchCount: 0,
    decisionBranchCount: 0,
  };
  cellsMetric.forEach((cell) => {
    cell.branches.forEach((branch) => {
      features.decisionPenalty += branch.decisionPenalty;
      features.tortuosity += branch.tortuosity;
      if (branch.branchAnalysis.endedBy == "dead-end") {
        features.deadEndBranchLength += branch.branchAnalysis.branchLength;
        features.deadEndBranchCount++;
      }
      if (branch.branchAnalysis.endedBy == "decision") {
        features.decisionBranchLength += branch.branchAnalysis.branchLength;
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
  console.log(raw.pathsAlternative)
  const derived = deriveMazeMetrics(raw);
  const scores: MazeScoringResult = calculateMazeScore(derived, raw, weights);

  return scores;
};
const deriveMazeMetrics = (raw: MazeRawMetrics): MazeDerivedMetrics => {
  const deadEndAvg =
    raw.features.deadEndBranchLength /
    Math.max(1, raw.features.deadEndBranchCount);

  const decisionEndAvg =
    raw.features.decisionBranchLength /
    Math.max(1, raw.features.decisionBranchCount);

  return {
    features: {
      deadEndAvg,
      decisionEndAvg,
      decisionPenalty: raw.features.decisionPenalty,
      tortuosity: raw.features.tortuosity,
    },

    paths: raw.paths,

    pathsAlternative: {
      repeatRatio: raw.pathsAlternative.repeatRatio,
      avgPathDetourRatio: raw.pathsAlternative.avgPathDetourRatio,
    },
  };
};

const calculateMazeScore = (
  derived: MazeDerivedMetrics,
  raw: MazeRawMetrics,
  weights: Weights,
): MazeScoringResult => {
  const totalBranches =
    raw.features.deadEndBranchCount + raw.features.decisionBranchCount;

  const weighted: MazeWeightedMetrics = {
    features: {
      deadEndAvg: derived.features.deadEndAvg * weights.features.deadEndAvg,
      decisionAvg: derived.features.decisionEndAvg * weights.features.decisionEndAvg,
      decisionPenaltyAvg: (derived.features.decisionPenalty / totalBranches) *
        weights.features.decisionPenalty,
      tortuosity: derived.features.tortuosity * weights.features.tortuosity,
    },

    paths: {
      avgTortuosity: derived.paths.avgTortuosity * weights.paths.avgTortuosity,
      avgTurnDensity: derived.paths.avgTurnDensity * weights.paths.avgTurnDensity,
      shortestPathTurnDensity: derived.paths.shortestPathTurnDensity *
        weights.paths.shortestPathTurnDensity,
    },

    pathsAlternative: {
      repeatRatio: derived.pathsAlternative.repeatRatio * weights.pathsAlternative.repeatRatio,
      avgPathDetourRatio: derived.pathsAlternative.avgPathDetourRatio * weights.pathsAlternative.avgPathDetourRatio,
    },

  };
  const scoreFeatures =
    weighted.features.deadEndAvg +
    weighted.features.decisionAvg +
    weighted.features.decisionPenaltyAvg +
    weighted.features.tortuosity;

  const scorePaths =
    weighted.paths.avgTortuosity +
    weighted.paths.avgTurnDensity +
    weighted.paths.shortestPathTurnDensity;

  const scorepathsAlternative =
    weighted.pathsAlternative.repeatRatio -
    weighted.pathsAlternative.avgPathDetourRatio;

  let totalFeatures = scoreFeatures * weights.features.total;
  let totalScores = scorePaths * weights.paths.total;
  let totalPathsAlternative = scorepathsAlternative * weights.pathsAlternative.total;
  const total =
    (totalFeatures + totalScores + totalPathsAlternative) /
    (Math.sqrt(raw.totalIntersections) * weights.global.intersectionPenalty);

  return {
    raw,
    derived,
    weighted,
    scores: {
      features: totalFeatures,
      paths: totalScores,
      pathsAlternative: totalPathsAlternative,
      total,
    },
  };
};
