import { CellInfo } from "@/lib/alogirthms/solving/types";
import { Maze, Position } from "../types";
import { getNeighborsByOpenWall } from "@/lib/alogirthms/solving/bfs";
import { traceBranchUntilDecision } from "./analysis/branchAnalysis";
import {  CellMetric } from "./types";
import { analyzeDecisionPenalty } from "./analysis/decisionPenalty";

export const getMetrics = (cellsInfo: CellInfo[][], maze: Maze) => {
  let cellsMetric: CellMetric[] = [];

  for (let r = 0; r < maze.rows; r++) {
    for (let c = 0; c < maze.cols; c++) {
      const current: Position = { row: r, col: c };
      const neighbors: Position[] = getNeighborsByOpenWall(maze, current);
      //we only get the statistic if is a decision path
      if (neighbors.length <= 2) continue;
      const penalties: number[] = analyzeDecisionPenalty(  
        neighbors,
        cellsInfo,
      );
      const rsta:CellMetric = {
        neighbors: neighbors,
        position: current,
        distance: cellsInfo[current.row][current.col].distance,
        decisionPenalties: penalties,
        branchLengthPenalties: neighbors.map((neighbor) =>
          traceBranchUntilDecision(neighbor, current, maze),
        ),
      };
      cellsMetric.push(rsta);
    }
  }
  const totalDifficulty = cellsMetric.reduce(
    (sum, m) => sum + Math.max(...m.decisionPenalties),
    0,
  );
  const hardestDecisions = cellsMetric.sort(
    (a, b) =>
      Math.max(...b.decisionPenalties) - Math.max(...a.decisionPenalties),
  );

  console.log("totalDifficulty: ", totalDifficulty);
  console.log(hardestDecisions);
};
