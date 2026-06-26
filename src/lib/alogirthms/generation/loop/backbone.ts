import { Position } from "@/lib/maze/types";
import { CellInfo, BFSResult } from "../../solving/types";
import { DistanceToBackBone, BackBone } from "./types";

export const getBackBoneOfBranchCell = (
  cellPosition: Position,
  cellInfo: CellInfo[][],
  backboneSet: Set<string>,
): DistanceToBackBone => {
  let steps = 0;

  // Constant time check using string primitives
  if (backboneSet.has(`${cellPosition.row},${cellPosition.col}`)) {
    return { backBone: cellPosition, steps };
  }

  let current: Position | null = cellPosition;

  while (current) {
    const parent: Position | null = cellInfo[current.row]?.[current.col].parent || null;

    // Replaced .some() array scan with O(1) Set lookup
    if (parent && backboneSet.has(`${parent.row},${parent.col}`)) {
      return { backBone: parent, steps };
    }

    current = parent;
    steps++;
  }

  throw new Error("No backbone ancestor found");
};

export const getBackBone = (
   cellInfo:CellInfo[][],
   start:Position,
  end: Position,
): BackBone => {

  let current: Position  | null= start;
  const reconstructedPath: Position[] = [];
  while (current) {
    reconstructedPath.unshift(current);

    current = cellInfo[current.row]?.[current.col].parent || null;
    if (current && current.row == end.row && current.col == end.col) {
      reconstructedPath.unshift(current);

    
      break;
    }
  }
  return { route: reconstructedPath, start, end };
};