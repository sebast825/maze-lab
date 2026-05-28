import { CellInfo } from "@/lib/alogirthms/solving/types";
import { Maze, Position } from "../types";
import { getNeighborsByOpenWall } from "@/lib/alogirthms/solving/bfs";
import { traceBranchUntilDecision } from "./analysis/branchAnalysis";
import { BranchMetric, CellMetric } from "./types";
import { analyzeDecisionPenalty } from "./analysis/decisionPenalty";
import { calculateBranchDifficulty, calculateMazeDifficulty } from "./scoring";

export const getMetrics = (cellsInfo: CellInfo[][], maze: Maze) => {
  let cellsMetric: CellMetric[] = [];

  for (let r = 0; r < maze.rows; r++) {
    for (let c = 0; c < maze.cols; c++) {
      const current: Position = { row: r, col: c };
      const neighbors: Position[] = getNeighborsByOpenWall(maze, current);
      //we only get the statistic if is a decision path
      if (neighbors.length <= 2) continue;

      const penalties: number[] = analyzeDecisionPenalty(neighbors, cellsInfo);

      const calculatedBranches = neighbors.map((n, index) => {
        const baseBranch: BranchMetric = {
          neighbor: n,
          decisionPenalty: penalties[index],
          branchLengthPenalty: traceBranchUntilDecision(n, current, maze)    
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
