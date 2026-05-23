import { Position } from "@/lib/maze/types";
import { CellInfo, BFSResult } from "../../solving/types";
import { DistanceToBackBone, BackBone } from "./types";

export const getBackBoneOfBranchCell = (
  cellPostion: Position,
  cellInfo: CellInfo[][],
  backboneRoute: Position[],
): DistanceToBackBone => {
  let steps = 0;
  // if current cell already belongs to backbone
  if (
    backboneRoute.some(
      (cell) => cell.row === cellPostion.row && cell.col === cellPostion.col,
    )
  ) {
    return { backBone: cellPostion, steps };
  }
  let current: Position | null = cellPostion;

  while (current) {
    const parent: Position | null =
      cellInfo[current.row]?.[current.col].parent || null;
    // reached backbone
    if (
      parent &&
      backboneRoute.some(
        (cell) => cell.col === parent.col && cell.row === parent.row,
      )
    ) {
      return { backBone: parent, steps };
    } // move through bfs tree
    current = parent;
    steps++;
  }
  console.log(current);
  throw new Error("No backbone ancestor found");
};


export const getBackBone = (
  { cellInfo, farthest }: BFSResult,
  end: Position,
): BackBone => {
  let start: Position = end;
  let current: Position | null = farthest;
  const reconstructedPath: Position[] = [];
  while (current) {
    reconstructedPath.unshift(current);

    current = cellInfo[current.row]?.[current.col].parent || null;
    if (current && current.row == end.row && current.col == end.col) {
      reconstructedPath.unshift(current);

      start = {
        row: reconstructedPath[reconstructedPath.length - 1].row,
        col: reconstructedPath[reconstructedPath.length - 1].col,
      };
      break;
    }
  }
  return { route: reconstructedPath, start, end };
};