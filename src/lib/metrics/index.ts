import { CellInfo } from "@/lib/algorithms/solving/types";
import { Direction, Maze, Position } from "../maze/types";
import {
  analyzeNodeBranches,
  countChangesOfDirections,
  getDirectionBetweenCells,
} from "./analysis/branchAnalysis";
import {
  CellMetric,
  MazeDifficultyFeatures,
  PathMetric,
  PathsMetrics,
} from "./types";

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
import { getClosestSizeKey } from "./normalize/mazeSizeSpecs";
import { getNeighborsByOpenWall } from "../maze/walls";
import { filterRedundantPaths } from "./analysis/filterRedundantPaths";

export const computeRawMetrics = (
  mazeCellData: CellInfo[][],
  maze: Maze,
  paths: Position[][],
): MazeRawMetrics => {
  const features: MazeDifficultyFeatures = computeMazeDifficultyFeatures(
    mazeCellData,
    maze,
  );

  const pathsMetrics: PathsMetrics = computePathMetrics(paths, maze);
  const totalIntersections: number = getTotalIntersections(maze);
  const filteredPaths : Position[][] = filterRedundantPaths(paths)
  const pathOverlapMetrics: AlternativeRawPathMetrics =
    computePathVariance(filteredPaths);
  const rawMetrics: MazeRawMetrics = {
    features,
    paths: pathsMetrics,
    pathsAlternative: pathOverlapMetrics,
    totalIntersections,

    totalPaths: paths.length,
  };
  return rawMetrics;
};
export const computeMazeMetrics = (
  mazeCellData: CellInfo[][],
  maze: Maze,
  paths: Position[][],
): MazeScoringResult => {
  const rawMetrics: MazeRawMetrics = computeRawMetrics(
    mazeCellData,
    maze,
    paths,
  );
  return analyzeMaze(
    rawMetrics,
    defaultWeights,
    getClosestSizeKey(maze.rows * maze.cols),
  );
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
        branches: analyzeNodeBranches(neighbors, current, maze),
        position: current,
        distance: mazeCellData[current.row][current.col].distance,
      };
      cellMetrics.push(cellMetric);
    }
  }

  return aggregateBranchMetrics(cellMetrics);
};

const computePathMetrics = (paths: Position[][], maze: Maze): PathsMetrics => {
  //when we edit a maze, may not have paths
  if (paths.length === 0) {
    return {
      shortestPathLength: 0,
      shortestPathTortuosity: 0,
      shortestPathDecisionNodes: 0,
      shortestPathWallRatio: 0,
    };
  }
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
    const tortuosity = countChangesOfDirections(directions) / path.length;

    pathMetrics.push({
      path,
      directions,
      tortuosity,
    });
  });

  let pathsMetrics = aggregatePathMetrics(pathMetrics, maze);

  return pathsMetrics;
};
