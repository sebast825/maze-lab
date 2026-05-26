import { Maze, Position } from "@/lib/maze/types";
import { BFSResult, CellInfo } from "./types";

/**
 * Breadth-First Search (BFS) for maze solving.
 * Finds the farthest cell from the start point and records distances and parent pointers.
 *
 * @returns Object containing:
 *   - cellInfo: distance and parent for each cell (for path reconstruction)
 *   - farthest: the most distant cell from start (ideal maze exit)
 */
export function bfs(
  maze: Maze,
  start: Position,
  end?: Position,
): BFSResult {
  // save the current cells that need to be processed
  const queue: Position[] = [start];
  //save the cell with the current distance to the start point
  const cellInfo: CellInfo[][] = Array(maze.rows)
    .fill(null)
    .map(() =>
      Array(maze.cols)
        .fill(null)
        .map(() => ({ distance: -1, parent: null })),
    );

  cellInfo[start.row][start.col].distance = 0;
  let farthest = { row: start.row, col: start.col, distance: 0 };
  let shortest = {
    row: start.row,
    col: start.col,
    distance: -1,
  };
  while (queue.length > 0) {
    const current = queue.shift()!;

    const neighbors = getNeighborsByOpenWall(maze, current);
    if (neighbors.length <= 0) {
      continue;
    }
    //update longer path
    if (farthest.distance < cellInfo[current.row][current.col].distance) {
      farthest.distance = cellInfo[current.row][current.col].distance;
      farthest.row = current.row;
      farthest.col = current.col;
    }

    neighbors.forEach((neighbor: Position) => {
          //update shortest path
      if (cellInfo[neighbor.row][neighbor.col].distance == -1) {
        if (
          end &&
          neighbor.row === end.row &&
          neighbor.col === end.col &&
          shortest.distance == -1
        ) {
          shortest.distance = cellInfo[current.row][current.col].distance;
          shortest.row = current.row;
          shortest.col = current.col;
        }
        queue.push(neighbor);
        cellInfo[neighbor.row][neighbor.col].distance =
          cellInfo[current.row][current.col].distance + 1;
        cellInfo[neighbor.row][neighbor.col].parent = {
          row: current.row,
          col: current.col,
        };
      }
    });
  }

  return { cellInfo, farthest, shortest };
}

export function reconstructPath(
  cellInfo: CellInfo[][],
  end: Position,
): Position[] {
  const path: Position[] = [];
  let current: Position | null = end;

  while (current !== null) {
    path.unshift(current);
    current = cellInfo[current.row][current.col].parent;
  }
  return path;
}

export function getNeighborsByOpenWall(
  maze: Maze,
  current: { row: number; col: number },
): Position[] {
  const neighbors: Position[] = [];
  const cell = maze.cells[current.row][current.col];

  // NORTE: Primero límites, luego pared actual, luego pared del vecino
  if (
    current.row - 1 >= 0 &&
    !cell.walls.north &&
    !maze.cells[current.row - 1][current.col].walls.south
  ) {
    neighbors.push({ row: current.row - 1, col: current.col });
  }

  // SUR: Primero límites, luego pared actual, luego pared del vecino
  if (
    current.row + 1 < maze.rows &&
    !cell.walls.south &&
    !maze.cells[current.row + 1][current.col].walls.north
  ) {
    neighbors.push({ row: current.row + 1, col: current.col });
  }

  // ESTE: Primero límites, luego pared actual, luego pared del vecino
  if (
    current.col + 1 < maze.cols &&
    !cell.walls.east &&
    !maze.cells[current.row][current.col + 1].walls.west
  ) {
    neighbors.push({ row: current.row, col: current.col + 1 });
  }

  // OESTE: Primero límites, luego pared actual, luego pared del vecino
  if (
    current.col - 1 >= 0 &&
    !cell.walls.west &&
    !maze.cells[current.row][current.col - 1].walls.east
  ) {
    neighbors.push({ row: current.row, col: current.col - 1 });
  }

  return neighbors;
}
