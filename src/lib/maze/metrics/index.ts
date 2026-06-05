import { CellInfo } from "@/lib/alogirthms/solving/types";
import { Direction, Maze, Position } from "../types";
import { getNeighborsByOpenWall } from "@/lib/alogirthms/solving/bfs";
import {
  analyzeNodeBranches,
  countChangesOfDirections,
  getDirectionBetweenCells,
  traceBranchUntilDecision,
} from "./analysis/branchAnalysis";
import {
  BranchAnalysis,
  BranchMetric,
  CellMetric,
  DecisionPenaltyAnalysis,
  MazeDifficultyFeatures,
  PathMetric,
  PathsMetrics,
} from "./types";
import { analyzeDecisionPenalty } from "./analysis/decisionPenalty";

import {
  aggregatePathMetrics,
  computePathVariance,
} from "./analysis/pathAnalysis";
import { getTotalIntersections } from "./utils";
import { aggregateBranchMetrics, analyzeMaze } from "./scoring/scoring";
import {
  AlternativeRawPathMetrics,
  MazeRawMetrics,
  MazeScoringResult,
} from "./scoring/types";
import { defaultWeights } from "./scoring/defaultWeights";

export const computeMazeMetrics = (
  mazeCellData: CellInfo[][],
  maze: Maze,
  paths: Position[][],
  shortestPathLength: number,
): MazeScoringResult => {
  const features: MazeDifficultyFeatures = computeMazeDifficultyFeatures(
    mazeCellData,
    maze,
  );

  const pathsMetrics: PathsMetrics = computePathMetrics(paths);
  const totalIntersections: number = getTotalIntersections(maze);
  const pathOverlapMetrics: AlternativeRawPathMetrics =
    computePathVariance(paths);
  const rawMetrics: MazeRawMetrics = {
    features,
    paths: pathsMetrics,
    pathsAlternative: pathOverlapMetrics,
    totalIntersections,
    shortestPathLength,
    totalPaths: paths.length,
  };
  return analyzeMaze(rawMetrics, defaultWeights);
};

const computeMazeDifficultyFeatures = (
  mazeCellData: CellInfo[][],
  maze: Maze,
): MazeDifficultyFeatures => {
  let cellMetrics: CellMetric[] = [];

  for (let r = 0; r < maze.rows; r++) {
    for (let c = 0; c < maze.cols; c++) {
      const current: Position = { row: r, col: c };
      const neighbors: Position[] = getNeighborsByOpenWall(maze, current);
      //we only get the statistic if is a decision node
      if (neighbors.length <= 2) continue;

      const cellMetric: CellMetric = {
        branches: analyzeNodeBranches(neighbors, mazeCellData, current, maze),
        position: current,
        distance: mazeCellData[current.row][current.col].distance,
      };
      cellMetrics.push(cellMetric);
    }
  }

  return aggregateBranchMetrics(cellMetrics);
};

const computePathMetrics = (paths: Position[][]): PathsMetrics => {
  let pathMetrics: PathMetric[] = [];
  paths.forEach((path) => {
    const directions: Direction[] = [];
    for (let i = 1; i < path.length; i++) {
      const direction: Direction = getDirectionBetweenCells(
        path[i - 1],
        path[i],
      );
      directions.push(direction);
    }
    const tortuosity = countChangesOfDirections(directions);

    pathMetrics.push({
      path,
      directions,
      tortuosity,
      turnDensity: tortuosity / path.length,
    });
  });

  let pathsMetrics = aggregatePathMetrics(pathMetrics);

  return pathsMetrics;
};
