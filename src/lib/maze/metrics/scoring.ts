import { getNeighborsByOpenWall } from "@/lib/alogirthms/solving/bfs";
import { Maze, Position } from "../types";
import { CellMetric, BranchMetric } from "./types";

export const calculateMazeDifficulty = (
  maze: Maze,
  cellsMetric: CellMetric[],
) => {
  let decisionPenalty = 0;
  let branchLengthPenalty = 0;
  let ambiguity = 0;
  let changesOfDirection = 0;
  const totalNodesDifficulty = cellsMetric.reduce((sum, metric) => {
    const nodeDifficulty = metric.branches.reduce((branchSum, branch) => {
      decisionPenalty += branch.decisionPenalty;
      branchLengthPenalty += branch.branchLengthPenalty.branchLength;
      changesOfDirection += branch.tortuosity;
      ambiguity += branch.ambiguity;
      const branchDifficulty =
        branch.decisionPenalty * branch.branchLengthPenalty.branchLength +
        branch.ambiguity +
        branch.tortuosity;

      return branchSum + branchDifficulty;
    }, 0);

    return sum + nodeDifficulty;
  }, 0);
  console.log("decisionPenalty: ", decisionPenalty);
  console.log("branchLengthPenalty: ", branchLengthPenalty);
  console.log("ambiguity: ", ambiguity);
  console.log("changesOfDirection: ", changesOfDirection);

  const totalIntersections: number = getTotalIntersections(maze);
  const dificulty = totalNodesDifficulty / totalIntersections;
  console.log("totalDifficulty: ", dificulty.toFixed(2));
};

export const calculateBranchDifficulty = (
  branch: BranchMetric,
): BranchMetric => {
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
