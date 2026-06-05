import { getNeighborsByOpenWall } from "@/lib/alogirthms/solving/bfs";
import { Position, Maze, Direction } from "../../types";
import { BranchAnalysis, BranchMetric, DecisionPenaltyAnalysis, MazeDifficultyFeatures } from "../types";
import { getNeighborsNotVisited } from "../../core";
import { analyzeDecisionPenalty } from "./decisionPenalty";
import { CellInfo } from "@/lib/alogirthms/solving/types";



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
  let pathDirections: Direction[] = [];

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
        pathDirections : pathDirections
      };
    }
    pathDirections.push(getDirectionBetweenCells(current, neighborsNotVisited[0]));
    current = neighborsNotVisited[0];

    historyPath.push(current);

    branchLength++;
  }
};

export const getDirectionBetweenCells = (
  current: Position,
  next: Position,
): Direction => {
  // if cells are in the same row then we need to remove east/west wall
  if (current.row === next.row && current.col != next.col) {
    //east/west
    if (current.col - next.col === 1) {
      return "west";
    }
    if (next.col - current.col === 1) {
      return "east";
    }
  }
  // if cells are in the same column then we need to remove north/south wall
  if (current.col === next.col && current.row != next.row) {
    //north/south
    if (current.row - next.row === 1) {
      return "north";
    }
    if (next.row - current.row === 1) {
      return "south";
    }
  }
  throw new Error("Unvalid direction");
};

export const countChangesOfDirections = (pathDirections: Direction[]) :number=> {
  let count = 0;
  
  for(let i = 1; i < pathDirections.length; i++){
    if(pathDirections[i] != pathDirections[i-1]) count ++
  }
  return count;
}

export const analyzeNodeBranches = (
  neighbors: Position[],
  mazeCellData: CellInfo[][],
  current: Position,
  maze: Maze,
): BranchMetric[] => {
  const decisionPenalty: DecisionPenaltyAnalysis = analyzeDecisionPenalty(
    neighbors,
    mazeCellData,
  );

  return neighbors.map((n, index) => {
    let traceBranch: BranchAnalysis = traceBranchUntilDecision(
      n,
      current,
      maze,
    );
    return {
      neighbor: n,
      decisionPenalty: decisionPenalty.penalties[index],
      branchAnalysis: traceBranch,
      tortuosity:
        countChangesOfDirections(traceBranch.pathDirections) /
        Math.max(1, traceBranch.branchLength),
    };
  });
};
