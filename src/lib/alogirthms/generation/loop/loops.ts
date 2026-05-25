import { Maze, Position } from "@/lib/maze/types";
import { BFSResult } from "../../solving/types";
import { BackBone, MazeStructureAnalysis, LoopCandidate } from "./types";
import { addColorToBackBone, removeWallAtSomeCandiates } from "./utils";
import { getBackBone } from "./backbone";
import {
  filterCandidatesByDistance,
  sortCandidatesByRegion,
  getLoopCandidates,
  scoreLoopCandidates,
} from "./loopCandidates";
import { getMazeStructure } from "./structureAnalysis";

export const createLopps = (
  { cellInfo, farthest }: BFSResult,
  end: Position,
  maze: Maze,
): Maze => {
  const backBone: BackBone = getBackBone({ cellInfo, farthest }, end);
  addColorToBackBone(backBone.route, maze);
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
    structure.intersections,
  );
  const filterByDistance: LoopCandidate[] =
    filterCandidatesByDistance(scoreCandadidates);
  const sortByRegion = sortCandidatesByRegion(filterByDistance, maze);
  removeWallAtSomeCandiates(sortByRegion, maze);
  return maze;
};


