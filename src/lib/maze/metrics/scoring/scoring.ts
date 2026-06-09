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
  const normalized: MazeNormalizedMetrics = getNormalizedMetrics(derived, spec);
  const { weighted, scores } = calculateMazeScore(normalized, raw, weights);

  const rsta : MazeScoringResult =  {
    raw,
    derived,
    normalized,
    weighted,
    scores,
  };
  console.log(rsta)
  return rsta;
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
): { weighted: MazeWeightedMetrics; scores: MazeScores } => {
  const totalBranches =
    raw.features.deadEndBranchCount + raw.features.decisionBranchCount;

  const weighted: MazeWeightedMetrics = {
    features: {
      deadEndAvg: derived.features.deadEndAvg * weights.features.deadEndAvg,
      decisionAvg:
        derived.features.decisionEndAvg * weights.features.decisionEndAvg,

      tortuosity:
        (derived.features.tortuosity / totalBranches) *
        weights.features.tortuosity,
    },

    paths: {
      avgTortuosity: derived.paths.avgTortuosity * weights.paths.avgTortuosity,
      shortestPathTortuosity:
        derived.paths.shortestPathTortuosity *
        weights.paths.shortestPathTurnDensity,
    },

    pathsAlternative: {
      repeatRatio:
        derived.pathsAlternative.repeatRatio *
        weights.pathsAlternative.repeatRatio,
      avgPathDetourRatio:
        derived.pathsAlternative.avgPathDetourRatio *
        weights.pathsAlternative.avgPathDetourRatio,
    },
  };
  const scoreFeatures =
    weighted.features.deadEndAvg +
    weighted.features.decisionAvg +
    weighted.features.tortuosity;

  const scorePaths =
    weighted.paths.avgTortuosity + weighted.paths.shortestPathTortuosity;
  /**
   * SCENARIOS -- scorePathsAlternative
   * SCENARIO 1: "The Safety Net" (Easy)
   * - High repeatRatio (0.90) + Low avgPathDetourRatio (0.10)
   * - Math: (1.0 - 0.90) + 0.10 = 0.20 (Low Difficulty)
   * - Player experience: Forgiving layout with overlapping paths.
   * Wrong turns reconnect to the main solution almost immediately.
   *
   * SCENARIO 2: "The Mirage" (Medium-Hard)
   * - High repeatRatio (0.80) + High avgPathDetourRatio (0.85)
   * - Math: (1.0 - 0.80) + 0.85 = 1.05 (High Difficulty)
   * - Player experience: Visually confusing déjà-vu effect.
   * Paths look identical, but picking the wrong one forces massive backtracking.
   *
   * SCENARIO 3: "The Strict Path" (Hard)
   * - Low repeatRatio (0.15) + High avgPathDetourRatio (0.90)
   * - Math: (1.0 - 0.15) + 0.90 = 1.75 (Maximum Difficulty)
   * - Player experience: Unforgiving and geometric. No safety loops or shortcuts.
   * Missing the main path leads straight into dead ends or massive dead zones.
   */
  const scorePathsAlternative =
    1.0 -
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
