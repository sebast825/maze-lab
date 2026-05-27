import { CellInfo } from "@/lib/alogirthms/solving/types";
import { Maze, Position } from "../types";
import { getNeighborsByOpenWall } from "@/lib/alogirthms/solving/bfs";
import { traceBranchUntilDecision } from "./analysis/branchAnalysis";
import { BranchMetric, CellMetric } from "./types";
import { analyzeDecisionPenalty } from "./analysis/decisionPenalty";

export const getMetrics = (cellsInfo: CellInfo[][], maze: Maze) => {
  let cellsMetric: CellMetric[] = [];

  for (let r = 0; r < maze.rows; r++) {
    for (let c = 0; c < maze.cols; c++) {
      const current: Position = { row: r, col: c };
      const neighbors: Position[] = getNeighborsByOpenWall(maze, current);
      //we only get the statistic if is a decision path
      if (neighbors.length <= 2) continue;

      const penalties: number[] = analyzeDecisionPenalty(neighbors, cellsInfo);

      const rsta: CellMetric = {
        branches: neighbors.map((n, index) => {
          return {
            neighbor: n,
            decisionPenalty: penalties[index],
            branchLengthPenalty: traceBranchUntilDecision(n, current, maze),
          };
        }),
        position: current,
        distance: cellsInfo[current.row][current.col].distance,
      };
      cellsMetric.push(rsta);
    }
  }

  const totalDifficulty = cellsMetric.reduce((sum: number, m: CellMetric) => {
    const branchLengths: number[] = m.branches.map(
      (b) => b.branchLengthPenalty.branchLength,
    );

    const maxPenalty =
      branchLengths.length > 0 ? Math.max(...branchLengths) : 0;

    return sum + maxPenalty;
  }, 0);

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

  console.log("totalDifficulty: ", totalDifficulty);
  console.log(hardestDecisions);
};
