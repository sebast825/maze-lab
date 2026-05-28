import { Position } from "../types";

export interface BranchAnalysis {
  branchLength: number;
  lastNode: Position;
  from: Position;
  path: Position[];
  to: Position;
  endedBy: "dead-end" | "decision";
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
  branchLengthPenalty: BranchAnalysis;
  branchDifficulty?: number;
}
