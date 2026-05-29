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
  MazeDifficultyResult,
  PathMetric,
  PathsMetrics,
} from "./types";
import { analyzeDecisionPenalty } from "./analysis/decisionPenalty";
import {
  aggregateBranchMetrics,
  calculateBranchDifficulty,
  calculateMazeDifficulty,
} from "./scoring";
import { aggregatePathMetrics } from "./analysis/pathAnalysis";
import { getTotalIntersections } from "./utils";

export const computeMazeMetrics = (
  mazeCellData: CellInfo[][],
  maze: Maze,
  paths: Position[][],
  shortestPathLength: number,
): MazeDifficultyResult => {
  const mazeDifficultyFeatures: MazeDifficultyFeatures =
    calculateMazeDifficultyFeatures(mazeCellData, maze);
  const pathsMetrics: PathsMetrics = computePathMetrics(paths);
  console.log("maze rows and cols: ", maze.rows, " ", maze.cols);
  const totalIntersections: number = getTotalIntersections(maze);

  return calculateMazeDifficulty(
    totalIntersections,
    mazeDifficultyFeatures,
    pathsMetrics,
    shortestPathLength,
    paths.length,
  );
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
          ambiguity: decisionPenalty.ambiguity,
          branchLengthPenalty: traceBranch,
          tortuosity: countChangesOfDirections(traceBranch.pathDirections),
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
