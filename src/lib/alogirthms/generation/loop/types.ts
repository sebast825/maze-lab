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
  score: LoopCandidateScore
}

export interface DistanceToBackBone {
  backBone: Position;
  steps: number;
}

interface LoopCandidateScore {
  backboneDepth: number;
  branchDistance: number;
  intersectionPenalty: number;
  isIntersection:boolean ;
  finalScore: number;
}