import { Position } from "../types";

export interface BranchAnalysis {
  branchLength: number;
  lastNode: Position;
  from: Position;
  path: Position[];
  to: Position;
  endedBy: "dead-end" | "decision";
};

export interface CellMetric {
  position: Position;
  decisionPenalties: number[];
  neighbors: Position[];
  distance: number;
  branchLengthPenalties: BranchAnalysis[];
}