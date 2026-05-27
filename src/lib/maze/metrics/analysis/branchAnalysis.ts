import { getNeighborsByOpenWall } from "@/lib/alogirthms/solving/bfs";
import { Position, Maze } from "../../types";
import { BranchAnalysis } from "../types";

export const traceBranchUntilDecision = (
  initBranchPosition: Position,
  from: Position,
  maze: Maze,
): BranchAnalysis => {
  let branchLength = 0;
  const visited = new Set<string>();
  visited.add(`${from.row},${from.col}`);
  const historyPath: Position[] = [];

  let current: Position = initBranchPosition;
  historyPath.push(current);

  while (true) {
    visited.add(`${current.row},${current.col}`);
    const neighbors = getNeighborsByOpenWall(maze, current);
    const neighborsNotVisited = neighbors.filter(
      (neighbor) => !visited.has(`${neighbor.row},${neighbor.col}`),
    );

    if (neighborsNotVisited.length === 0 || neighborsNotVisited.length >= 2) {
      return {
        branchLength,
        path: historyPath,
        lastNode: current,
        from,
        to: initBranchPosition,
        endedBy: neighborsNotVisited.length === 0 ? "dead-end" : "decision",
      };
    }

    current = neighborsNotVisited[0];

    historyPath.push(current);

    branchLength++;
  }
};
