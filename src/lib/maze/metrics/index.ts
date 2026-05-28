import { CellInfo } from "@/lib/alogirthms/solving/types";
import { Direction, Maze, Position } from "../types";
import { getNeighborsByOpenWall } from "@/lib/alogirthms/solving/bfs";
import {
  countChangesOfDirections,
  getDirectionBetweenCells,
  traceBranchUntilDecision,
} from "./analysis/branchAnalysis";
import {
  BranchMetric,
  CellMetric,
  DecisionPenaltyAnalysis,
  PathMetric,
  PathsMetrics,
} from "./types";
import { analyzeDecisionPenalty } from "./analysis/decisionPenalty";
import { calculateBranchDifficulty, calculateMazeDifficulty } from "./scoring";
import { aggregatePathMetrics } from "./analysis/pathAnalysis";

export const getMetrics = (cellsInfo: CellInfo[][], maze: Maze) => {
  let cellsMetric: CellMetric[] = [];

  for (let r = 0; r < maze.rows; r++) {
    for (let c = 0; c < maze.cols; c++) {
      const current: Position = { row: r, col: c };
      const neighbors: Position[] = getNeighborsByOpenWall(maze, current);
      //we only get the statistic if is a decision path
      if (neighbors.length <= 2) continue;

      const decisionPenalty: DecisionPenaltyAnalysis = analyzeDecisionPenalty(
        neighbors,
        cellsInfo,
      );

      const calculatedBranches = neighbors.map((n, index) => {
        let traceBranch = traceBranchUntilDecision(n, current, maze);
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
        distance: cellsInfo[current.row][current.col].distance,
        nodeDifficulty: calculatedBranches.reduce(
          (sum, b) => sum + b.branchDifficulty!,
          0,
        ),
      };
      cellsMetric.push(cellMetric);
    }
  }
  const hardestDecisions = [...cellsMetric].sort((a, b) => {
    const maxB =
      b.branches.length > 0
        ? Math.max(...b.branches.map((br) => br.decisionPenalty))
        : 0;
    const maxA =
      a.branches.length > 0
        ? Math.max(...a.branches.map((br) => br.decisionPenalty))
        : 0;

    return maxB - maxA;
  });

  console.log(hardestDecisions);
  calculateMazeDifficulty(maze, cellsMetric);
};

export const computePathMetrics = (paths: Position[][]): PathsMetrics => {
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
    });
  });

  let pathsMetrics = aggregatePathMetrics(pathMetrics);

  return pathsMetrics;
};
