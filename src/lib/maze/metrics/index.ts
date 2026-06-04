import { CellInfo } from "@/lib/alogirthms/solving/types";
import { Direction, Maze, Position } from "../types";
import { getNeighborsByOpenWall } from "@/lib/alogirthms/solving/bfs";
import {
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
  PathOverlapMetrics,
  PathsMetrics,
} from "./types";
import { analyzeDecisionPenalty } from "./analysis/decisionPenalty";

import {
  aggregatePathMetrics,
  computePathVariance,
} from "./analysis/pathAnalysis";
import { getTotalIntersections } from "./utils";
import { aggregateBranchMetrics, analyzeMaze, calculateBranchDifficulty } from "./scoring/scoring";
import { MazeRawMetrics, MazeScoringResult } from "./scoring/types";
import { defaultWeights } from "./scoring/defaultWeights";

export const computeMazeMetrics = (
  mazeCellData: CellInfo[][],
  maze: Maze,
  paths: Position[][],
  shortestPathLength: number,
): MazeScoringResult => {
  const features: MazeDifficultyFeatures = calculateMazeDifficultyFeatures(
    mazeCellData,
    maze,
  );
  
//  console.log("maze: ", maze)
  const pathsMetrics: PathsMetrics = computePathMetrics(paths);
 //console.log("maze rows and cols: ", maze.rows, " ", maze.cols);
  const totalIntersections: number = getTotalIntersections(maze);
  const pathOverlapMetrics: PathOverlapMetrics = computePathVariance(paths);

  const rawMetrics: MazeRawMetrics = {
    features,
    paths: pathsMetrics,
    overlaps: pathOverlapMetrics,
    totalIntersections,
    shortestPathLength,
    totalPaths: paths.length,
  };
  return analyzeMaze(rawMetrics,defaultWeights);
};

const calculateMazeDifficultyFeatures = (
  mazeCellData: CellInfo[][],
  maze: Maze,
): MazeDifficultyFeatures => {
  let cellMetrics: CellMetric[] = [];

  for (let r = 0; r < maze.rows; r++) {
    for (let c = 0; c < maze.cols; c++) {
      const current: Position = { row: r, col: c };
      const neighbors: Position[] = getNeighborsByOpenWall(maze, current);
      //we only get the statistic if is a decision path
      if (neighbors.length <= 2) continue;

      const decisionPenalty: DecisionPenaltyAnalysis = analyzeDecisionPenalty(
        neighbors,
        mazeCellData,
      );

      const calculatedBranches = neighbors.map((n, index) => {
        let traceBranch: BranchAnalysis = traceBranchUntilDecision(
          n,
          current,
          maze,
        );
        const baseBranch: BranchMetric = {
          neighbor: n,
          decisionPenalty: decisionPenalty.penalties[index],
          branchAnalysis: traceBranch,
          tortuosity: countChangesOfDirections(traceBranch.pathDirections)/Math.max(1, traceBranch.branchLength),
        };

        return calculateBranchDifficulty(baseBranch);
      });
      const cellMetric: CellMetric = {
        branches: calculatedBranches,
        position: current,
        distance: mazeCellData[current.row][current.col].distance,
        nodeDifficulty: calculatedBranches.reduce(
          (sum, b) => sum + b.branchDifficulty!,
          0,
        ),
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
