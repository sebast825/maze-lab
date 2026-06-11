import { CellMetric, MazeDifficultyFeatures } from "../types";
import {
  MazeDerivedMetrics,
  MazeRawMetrics,
  MazeScores,
  MazeScoringResult,
  MazeWeightedMetrics,
  Weights,
} from "./types";
import { getNormalizedMetrics } from "../normalize/normalize";
import { MazeNormalizedMetrics, MazeSizeSpecKey } from "../normalize/types";

export const aggregateBranchMetrics = (
  cellsMetric: CellMetric[],
): MazeDifficultyFeatures => {
  const features: MazeDifficultyFeatures = {
    tortuosity: 0,
    deadEndBranchLength: 0,
    decisionBranchLength: 0,
    deadEndBranchCount: 0,
    decisionBranchCount: 0,
  };
  cellsMetric.forEach((cell) => {
    cell.branches.forEach((branch) => {
      features.tortuosity += branch.tortuosity;
      if (branch.branchAnalysis.endedBy == "dead-end") {
        features.deadEndBranchLength += branch.branchAnalysis.path.length;
        features.deadEndBranchCount++;
      }
      if (branch.branchAnalysis.endedBy == "decision") {
        features.decisionBranchLength += branch.branchAnalysis.path.length;
        features.decisionBranchCount++;
      }
    });
  });

  return features;
};

export const analyzeMaze = (
  raw: MazeRawMetrics,
  weights: Weights,
  spec: MazeSizeSpecKey,
): MazeScoringResult => {
  const derived: MazeDerivedMetrics = deriveMazeMetrics(raw);
  console.log(raw.paths);
  console.log(derived.paths);
  const normalized: MazeNormalizedMetrics = getNormalizedMetrics(derived, spec);
  const { weighted, scores } = calculateMazeScore(normalized, weights);

  const rsta: MazeScoringResult = {
    raw,
    derived,
    normalized,
    weighted,
    scores,
  };

  return rsta;
};
const deriveMazeMetrics = (raw: MazeRawMetrics): MazeDerivedMetrics => {
  console.log("rawpahts, ", raw.paths);
  const deadEndAvg =
    raw.features.deadEndBranchLength /
    Math.max(1, raw.features.deadEndBranchCount);

  const decisionEndAvg =
    raw.features.decisionBranchLength /
    Math.max(1, raw.features.decisionBranchCount);
  const totalBranches =
    raw.features.deadEndBranchCount + raw.features.decisionBranchCount;

  return {
    features: {
      deadEndAvg,
      decisionEndAvg,
      tortuosityAvg: raw.features.tortuosity / totalBranches,
    },

    paths: raw.paths,

    pathsAlternative: {
      repeatRatio: raw.pathsAlternative.repeatRatio,
      avgPathDetourRatio: raw.pathsAlternative.avgPathDetourRatio,
    },
  };
};

const calculateMazeScore = (
  normalized: MazeNormalizedMetrics,
  weights: Weights,
): { weighted: MazeWeightedMetrics; scores: MazeScores } => {
  const weighted: MazeWeightedMetrics = {
    features: {
      deadEndAvg: normalized.features.deadEndAvg * weights.features.deadEndAvg,
      decisionAvg:
        normalized.features.decisionEndAvg * weights.features.decisionEndAvg,

      tortuosity:
        normalized.features.tortuosityAvg * weights.features.tortuosityAvg,
    },

    paths: {
      shortestPathTortuosity:
        normalized.paths.shortestPathTortuosity *
        weights.paths.shortestPathTortuosity,
      shortestPathLength:
        normalized.paths.shortestPathLength * weights.paths.shortestPathLength,
      shortestPathDecisionNodes:
        normalized.paths.shortestPathDecisionNodes *
        weights.paths.shortestPathDecisionNodes,
    },

    pathsAlternative: {
      repeatRatio:
        normalized.pathsAlternative.repeatRatio *
        weights.pathsAlternative.repeatRatio,
      avgPathDetourRatio:
        normalized.pathsAlternative.avgPathDetourRatio *
        weights.pathsAlternative.avgPathDetourRatio,
    },
  };
  const scoreFeatures =
    weighted.features.deadEndAvg +
    weighted.features.decisionAvg +
    weighted.features.tortuosity;

  const scorePaths =
    weighted.paths.shortestPathTortuosity +
    weighted.paths.shortestPathLength +
    weighted.paths.shortestPathDecisionNodes;

  const scorePathsAlternative =
    weighted.pathsAlternative.repeatRatio +
    weighted.pathsAlternative.avgPathDetourRatio;

  let totalFeatures = scoreFeatures * weights.features.total;
  let totalScores = scorePaths * weights.paths.total;
  let totalPathsAlternative =
    scorePathsAlternative * weights.pathsAlternative.total;

  const total = totalFeatures + totalScores + totalPathsAlternative;

  return {
    weighted,
    scores: {
      features: totalFeatures,
      paths: totalScores,
      pathsAlternative: totalPathsAlternative,
      total,
    },
  };
};
