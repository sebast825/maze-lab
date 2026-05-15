import { Maze, Position } from "@/lib/maze/types";
import { BFSResult, CellInfo } from "./types";

/**
 * Breadth-First Search (BFS) for maze solving.
 * Finds the farthest cell from the end point and records distances and parent pointers.
 *
 * @returns Object containing:
 *   - cellInfo: distance and parent for each cell (for path reconstruction)
 *   - farthest: the most distant cell from end (ideal maze exit)
 */
export function bfs(maze: Maze, end: Position): BFSResult {
  // save the current cells that need to be processed
  const queue: Position[] = [end];
  //save the cell with the current distance to the end point
  const cellInfo: CellInfo[][] = Array(maze.rows)
    .fill(null)
    .map(() =>
      Array(maze.cols)
        .fill(null)
        .map(() => ({ distance: -1, parent: null })),
    );

  cellInfo[end.row][end.col].distance = 0;
  let farthest = { row: end.row, col: end.col, distance: 0 };

  while (queue.length > 0) {
    const current = queue.shift()!;
    const neighbors = getNeighborsByOpenWall(maze, current);
    if (neighbors.length <= 0) {
      continue;
    }
    neighbors.forEach((neighbor) => {
      if (cellInfo[neighbor.row][neighbor.col].distance == -1) {
        queue.push(neighbor);
        cellInfo[neighbor.row][neighbor.col].distance =
          cellInfo[current.row][current.col].distance + 1;
        cellInfo[neighbor.row][neighbor.col].parent = {
          row: current.row,
          col: current.col,
        };
      }
      //update longer path
      if (farthest.distance < cellInfo[current.row][current.col].distance) {
        farthest.distance = cellInfo[current.row][current.col].distance;
        farthest.row = current.row;
        farthest.col = current.col;
      }
    });
  }

  return { cellInfo, farthest };
}

function getNeighborsByOpenWall(
  maze: Maze,
  current: { row: number; col: number },
): Position[] {
  const neighbors: Position[] = [];
  const cell = maze.cells[current.col][current.row];
  if (!cell.walls.north && current.col - 1 >= 0)
    neighbors.push({ row: current.row, col: current.col - 1 });
  if (!cell.walls.east && current.row + 1 < maze.cols)
    neighbors.push({ row: current.row + 1, col: current.col });
  if (!cell.walls.south && current.col + 1 < maze.rows)
    neighbors.push({ row: current.row, col: current.col + 1 });
  if (!cell.walls.west && current.row - 1 >= 0)
    neighbors.push({ row: current.row - 1, col: current.col });

  return neighbors;
}
