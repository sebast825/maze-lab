import { Position } from "@/lib/maze/types";

export interface BackBone {
  route: Position[];
  start: Position;
  end: Position;
}

export interface MazeStructureAnalysis {
  branches: Position[];
  intersections: Position[];
}
export interface LoopCandidate {
  from: Position;
  to: Position;
}
