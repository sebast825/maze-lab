import { Maze, Position } from "@/lib/maze/types";
import { CellInfo } from "../../solving/types";
import { BackBone, MazeStructureAnalysis, LoopCandidate } from "./types";
import { addColorToBackBone, removeWallAtSomeCandiates } from "./utils";
import { getBackBone } from "./backbone";
import { getBalancedCandidates } from "./loopCandidates";
import { getMazeStructure } from "./structureAnalysis";

export const createLopps = (
  cellInfo: CellInfo[][],
  start: Position,
  end: Position,
  maze: Maze,
): Maze => {
  const backBone: BackBone = getBackBone(cellInfo, start, end);
  //addColorToBackBone(backBone.route, maze);
  const structure: MazeStructureAnalysis = getMazeStructure(
    cellInfo,
    backBone.route,
    maze,
  );
  const candidates: LoopCandidate[] = getBalancedCandidates(
    maze,
    structure,
    cellInfo,
    backBone.route,
  );

  removeWallAtSomeCandiates(candidates, maze);
  return maze;
};
