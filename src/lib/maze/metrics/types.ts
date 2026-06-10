import { Direction, Position } from "../types";

export interface BranchAnalysis {
  lastNode: Position;
  from: Position;
  path: Position[];
  to: Position;
  endedBy: "dead-end" | "decision";
  pathDirections: Direction[];
}

export interface CellMetric {
  position: Position;
  distance: number;
  branches: BranchMetric[];
}
export interface BranchMetric {
  neighbor: Position;

  branchAnalysis: BranchAnalysis;
  /**
   * Measures how "twisted" the path is.
   * Defined as the number of direction changes along the branch path.
   * Higher value = more turns = harder to mentally track the path.
   */
  tortuosity: number;
}

export interface PathsMetrics {
  avgTortuosity: number;
  /**
   * Turn density of the shortest valid solution path.
   * Higher value = shortest route is more visually confusing.
   */
  shortestPathTortuosity: number;
  /**
   * Decision nodes on shortest path / shortest path length
   */
  decisionShortestPathAvg: number;
}

export interface PathMetric {
  path: Position[];
  directions: Direction[];
  //Total number of direction changes along the path divieded by the path length
  tortuosity: number;
}

export interface MazeDifficultyFeatures {
  // Total branch tortuosity accumulated across the maze.
  tortuosity: number;
  // Total depth of branches ending in dead ends.
  deadEndBranchLength: number;
  // Total depth of branches ending in other decisions.
  decisionBranchLength: number;
  // Total amount of dead-end branches.
  deadEndBranchCount: number;
  // Total amount of branches ending in another decision node.
  decisionBranchCount: number;
}
