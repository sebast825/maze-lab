import { Maze, Position } from "@/lib/maze/types";
import { BFSResult } from "../../solving/types";
import { BackBone, MazeStructureAnalysis, LoopCandidate } from "./types";
import { removeWallAtSomeCandiates } from "./utils";
import { getBackBone } from "./backbone";
import { filterCandidatesByDistance, getLoopCandidates, scoreLoopCandidates } from "./loopCandidates";
import { getMazeStructure } from "./structureAnalysis";

export const createLopps = (
  { cellInfo, farthest }: BFSResult,
  end: Position,
  maze: Maze,
): Maze => {
  const backBone: BackBone = getBackBone({ cellInfo, farthest }, end);
  const structure: MazeStructureAnalysis = getMazeStructure(
    cellInfo,
    backBone.route,
    maze,
  );
  const loopCandidates: LoopCandidate[] = getLoopCandidates(
    structure.branches,
    maze,
  );
  const scoreCandadidates: LoopCandidate[] = scoreLoopCandidates(
    loopCandidates,
    cellInfo,
    backBone.route,
    maze,
    structure.intersections
  );
  const filterCandidates : LoopCandidate[] = filterCandidatesByDistance(scoreCandadidates);
  console.log(filterCandidates)
  removeWallAtSomeCandiates(filterCandidates, maze);
  return maze;
};
