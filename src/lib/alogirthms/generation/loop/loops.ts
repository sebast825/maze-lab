import { Cell, Maze, Position } from "@/lib/maze/types";
import { BFSResult, CellInfo } from "../../solving/types";
import { getNeighbors, removeWallBetween } from "@/lib/maze/utils";
import {
  BackBone,
  MazeStructureAnalysis,
  LoopCandidate,
  DistanceToBackBone,
} from "./types";
import { hasWallWithNeighbor } from "./utils";

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
  const filterCandadidates: LoopCandidate[] = filterLoopCandates(
    loopCandidates,
    cellInfo,
    backBone.route,
  );

  removeWallAtSomeCandiates(filterCandadidates, maze);
  return maze;
};

const removeWallAtSomeCandiates = (candidates: LoopCandidate[], maze: Maze) => {
  console.log(candidates);
  for (let i = 0; i < 20; i++) {
    let candidate: LoopCandidate = candidates[i];
    removeWallBetween(maze, candidate.from, candidate.to);
    maze.cells[candidate.from.row][candidate.from.col].startPoint = true;
    i++;
  }
};
const filterLoopCandates = (
  candidates: LoopCandidate[],
  cellInfo: CellInfo[][],
  backboneRoute: Position[],
): LoopCandidate[] => {
  return (
    candidates
      .map((candidate) => {
        // avoid direct parent connection
        const parent = cellInfo[candidate.from.row][candidate.from.col].parent;
        // compare coordinates, NOT object reference
        if (
          parent &&
          parent.row === candidate.to.row &&
          parent.col === candidate.to.col
        ) {
          candidate.score - 1;
          return candidate;
        }

        const { backBone: fromBackBone, steps: stepsFrom } =
          getBackBoneOfBranchCell(candidate.from, cellInfo, backboneRoute);

        const { backBone: toBackBone, steps: stepsTo } =
          getBackBoneOfBranchCell(candidate.to, cellInfo, backboneRoute);

        // avoid loops inside same major branch
        if (
          fromBackBone.row === toBackBone.row &&
          fromBackBone.col === toBackBone.col
        ) {
          return {
            ...candidate,
            score: -50,
          };
        }
        // return candidate with computed score
        return {
          ...candidate,
          //stablish score base on distance from each cell to backBone, this will join cells if are very farm from main path
          score: stepsFrom + stepsTo,
        };
      }) // remove very bad candidates
      .filter((candidate) => candidate.score > 0)
      // prioritize best candidates first
      .sort((a, b) => b.score - a.score)
  );
};

const getBackBoneOfBranchCell = (
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
const getLoopCandidates = (
  branches: Position[],
  maze: Maze,
): LoopCandidate[] => {
  const loopCandidate: LoopCandidate[] = [];
  branches.forEach((cell) => {
    const neighbors: Position[] = getNeighbors(maze, cell);
    neighbors.forEach((neighbor) => {
      if (hasWallWithNeighbor(maze, cell, neighbor)) {
        //this if avoid duplicates for example to have relation A-B and B-A
        if (
          cell.row > neighbor.row ||
          (cell.row === neighbor.row && cell.col > neighbor.col)
        ) {
          loopCandidate.push({ from: cell, to: neighbor, score: 0 });
        }
      }
    });
  });
  return loopCandidate;
};

const getBackBone = (
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

//compare all Cells and if is not part of backBone we return the position of those cells
const getMazeStructure = (
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
  console.log(cell);
  let openWalls = 0;
  if (!cell.walls.north) openWalls++;
  if (!cell.walls.west) openWalls++;
  if (!cell.walls.east) openWalls++;
  if (!cell.walls.south) openWalls++;
  return openWalls >= 3;
};
