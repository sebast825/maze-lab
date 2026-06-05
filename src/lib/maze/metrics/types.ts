import { Direction, Position } from "../types";

export interface BranchAnalysis {
  branchLength: number;
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
  nodeDifficulty: number;
}
export interface BranchMetric {
  neighbor: Position;
  //difference between the best option and if choose to take this branch
  decisionPenalty: number;
  branchAnalysis: BranchAnalysis;
  branchDifficulty?: number;
  /**
   * Measures how "twisted" the path is.
   * Defined as the number of direction changes along the branch path.
   * Higher value = more turns = harder to mentally track the path.
   */
  tortuosity: number;
}

export interface DecisionPenaltyAnalysis {
  /**
   * Difference from the best available path.
   * 0 = optimal branch
   * Higher value = branch moves farther away from the solution
   */
  penalties: number[];
  /**
   * Difference between the best and second-best branch.
   * Lower value = harder to distinguish the correct path.
   */
  ambiguity: number;
}

export interface PathsMetrics {
  avgTortuosity: number;
  /**
   * Turn density of the shortest valid solution path.
   * Higher value = shortest route is more visually confusing.
   */
  shortestPathTurnDensity: number;
  //Average turn density across all valid solution paths.
  avgTurnDensity: number;
}

export interface PathMetric {
  path: Position[];
  directions: Direction[];
  //Total number of direction changes along the path.
  tortuosity: number;
  /**
   * Ratio between turns and path length.
   * Higher value = more turns per step.
   */
  turnDensity: number;
}

export interface MazeDifficultyFeatures {
  // Sum of local branch penalties across decision nodes.
  decisionPenalty: number;
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


