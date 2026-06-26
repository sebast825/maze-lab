import { Maze, Position } from "@/lib/maze/types";
import { CellInfo, MazePathMaps } from "../../solving/types";
import { BackBone, MazeStructureAnalysis, LoopCandidate } from "./types";
import { addColorToBackBone, generateMazePathMaps, removeWallAtSomeCandiates } from "./utils";
import { getBackBone } from "./backbone";
import { getBalancedCandidates } from "./loopCandidates";
import { getMazeStructure } from "./structureAnalysis";

export const createLopps = (
  start: Position,
  end: Position,
  maze: Maze,
): Maze => {
  const mazePathMaps: MazePathMaps = generateMazePathMaps(maze, start, end);
  const backBone: BackBone = getBackBone(mazePathMaps.fromStart, start, end);
  //addColorToBackBone(backBone.route, maze);
  const structure: MazeStructureAnalysis = getMazeStructure(
    mazePathMaps.fromStart,
    backBone.route,
    maze,
  );
    const backboneSet = new Set<string>(
    backBone.route.map(cell => `${cell.row},${cell.col}`)
  );
  const candidates: LoopCandidate[] = getBalancedCandidates(
    maze,
    structure,
    mazePathMaps,
   backboneSet
  );

  removeWallAtSomeCandiates(candidates, maze);
  return maze;
};



