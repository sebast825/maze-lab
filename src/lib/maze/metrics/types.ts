import { Direction, Position } from "../types";

export interface BranchAnalysis {
  branchLength: number;
  lastNode: Position;
  from: Position;
  path: Position[];
  to: Position;
  endedBy: "dead-end" | "decision";
  pathDirections : Direction[]
}

export interface CellMetric {
  position: Position;
  distance: number;
  branches: BranchMetric[];
  nodeDifficulty: number;
}
export interface BranchMetric {
  neighbor: Position;
  decisionPenalty: number;
  ambiguity: number;
  branchLengthPenalty: BranchAnalysis;
  branchDifficulty?: number;
  /**
 * Measures how "twisted" the path is.
 * Defined as the number of direction changes along the branch path.
 * Higher value = more turns = harder to mentally track the path.
 */
  tortuosity: number
}

export interface DecisionPenaltyAnalysis {
  penalties: number[];
  /**
   * Lower value = more ambiguous
   * Higher value = more obvious correct path
   */
  ambiguity: number;
}
