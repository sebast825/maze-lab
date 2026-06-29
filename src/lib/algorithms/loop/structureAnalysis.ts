import { Position, Maze, Cell } from "@/lib/maze/types";
import { CellInfo } from "../solving/types";
import { MazeStructureAnalysis } from "./types";

//compare all Cells and if is not part of backBone we return the position of those cells
export const getMazeStructure = (
  cellInfo: CellInfo[][],
  backBone: Position[],
  maze: Maze,
): MazeStructureAnalysis => {
  const backboneSet = new Set(backBone.map((p) => `${p.row},${p.col}`));
  let structure: MazeStructureAnalysis = {
    branches: [],
    intersections: [],
  };
  for (let row = 0; row < cellInfo.length; row++) {
    for (let col = 0; col < cellInfo[0].length; col++) {
      const key = `${row},${col}`;
      if (!backboneSet.has(key)) {
        structure.branches.push({ row, col });
      }
      if (getCellsWithIntersection(maze.cells[row][col])) {
        structure.intersections.push({ row, col });
      }
    }
  }
  return structure;
};

//three or 4 open walls
const getCellsWithIntersection = (cell: Cell): boolean => {
  let openWalls = 0;
  if (!cell.walls.north) openWalls++;
  if (!cell.walls.west) openWalls++;
  if (!cell.walls.east) openWalls++;
  if (!cell.walls.south) openWalls++;
  return openWalls >= 3;
};