import { Maze, Position } from "@/lib/maze/types";
import { getNeighbors } from "@/lib/maze/core";
import { bfs } from "../solving/bfs";
import { BFSResult, CellInfo } from "../solving/types";
import { removeWallBetween } from "@/lib/maze/walls";

export const connectDisconnectedRegions = (maze: Maze): Maze => {
  let { cellInfo }: BFSResult = bfs(maze, { row: 1, col: 1 });
  while (hasDisconnectedCells(cellInfo)) {
    connectLostCells(maze, cellInfo);
    ({ cellInfo } = bfs(maze, { row: 1, col: 1 }));
  }
  return maze;
};

const connectLostCells = (maze: Maze, cellInfo: CellInfo[][]) => {
  const unconnectedPos: Position[] = getDisconnectedCells(cellInfo, maze);
  const connectedPos: Position[] = getConnectedCells(cellInfo, maze);

  for (const current of unconnectedPos) {
    const neighbors: Position[] = getNeighbors(maze, current);
    const shuffledNeighbors = [...neighbors].sort(() => Math.random() - 0.5);
    const neighborConnected: Position | undefined = shuffledNeighbors.find((neighbor) =>
      connectedPos.some(
        (connected) =>
          connected.row === neighbor.row && connected.col === neighbor.col,
      ),
    );
    if (neighborConnected) {
      removeWallBetween(maze, current, neighborConnected);
      break;
    }
  }
};
const hasDisconnectedCells = (cells: CellInfo[][]): boolean => {
  return cells.some((row) => row.some((cell) => cell.distance === -1));
};

const getDisconnectedCells = (cells: CellInfo[][], maze: Maze): Position[] => {
  return cells.flatMap((row, rowIndex) =>
    row.flatMap((cell, colIndex) =>
      cell.distance === -1 ? { row: rowIndex, col: colIndex } : [],
    ),
  );
};
const getConnectedCells = (cells: CellInfo[][], maze: Maze): Position[] => {
  return cells.flatMap((row, rowIndex) =>
    row.flatMap((cell, colIndex) =>
      cell.distance != -1 ? { row: rowIndex, col: colIndex } : [],
    ),
  );
};
