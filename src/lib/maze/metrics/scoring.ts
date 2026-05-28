import { getNeighborsByOpenWall } from "@/lib/alogirthms/solving/bfs";
import { Maze, Position } from "../types";
import { CellMetric, BranchMetric } from "./types";

export const calculateMazeDifficulty = (maze: Maze, cellsMetric: CellMetric[]) => {

  const totalNodesDifficulty = cellsMetric.reduce(
  (sum, metric) => {
    const nodeDifficulty = metric.branches.reduce(
      (branchSum, branch) => {
        const branchDifficulty =
          branch.decisionPenalty *
          branch.branchLengthPenalty.branchLength;

        return branchSum + branchDifficulty;
      },
      0,
    );

    return sum + nodeDifficulty;
  },
  0,
);
  const totalIntersections: number = getTotalIntersections(maze);
  const dificulty = totalNodesDifficulty / totalIntersections;
  console.log("totalDifficulty: ", dificulty.toFixed(2));
};

export const calculateBranchDifficulty = (branch: BranchMetric): BranchMetric => {
  const branchDifficulty =
    branch.decisionPenalty * branch.branchLengthPenalty.branchLength;
  return { ...branch, branchDifficulty };
};

const getTotalIntersections = (maze: Maze): number => {
  let interesections: number = 0;
  for (let r = 0; r < maze.rows; r++) {
    for (let c = 0; c < maze.cols; c++) {
      const neighbors: Position[] = getNeighborsByOpenWall(maze, {
        row: r,
        col: c,
      });
      if (neighbors.length >= 3) interesections++;
    }
  }
  return interesections;
};
