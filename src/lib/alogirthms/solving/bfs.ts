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
export function bfs(maze: Maze, end: { x: number; y: number }): BFSResult {
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

  cellInfo[end.x][end.y].distance = 0;
  let farthest = { x: end.x, y: end.y, distance: 0 };

  while (queue.length > 0) {
    const current = queue.shift()!;
    const neighbors = getNeighborsByOpenWall(maze, current);
    if (neighbors.length <= 0) {
      continue;
    }
    neighbors.forEach((neighbor) => {
      if (cellInfo[neighbor.x][neighbor.y].distance == -1) {
        queue.push(neighbor);
        cellInfo[neighbor.x][neighbor.y].distance =
          cellInfo[current.x][current.y].distance + 1;
        cellInfo[neighbor.x][neighbor.y].parent = {
          x: current.x,
          y: current.y,
        };
      }
      //update longer path
      if (farthest.distance < cellInfo[current.x][current.y].distance) {
        farthest.distance = cellInfo[current.x][current.y].distance;
        farthest.x = current.x;
        farthest.y = current.y;
      }
    });
  }

  return { cellInfo, farthest };
}

function getNeighborsByOpenWall(
  maze: Maze,
  current: { x: number; y: number },
): Position[] {
  const neighbors: Position[] = [];
  const cell = maze.cells[current.y][current.x];
  if (!cell.walls.north && current.y - 1 >= 0)
    neighbors.push({ x: current.x, y: current.y - 1 });
  if (!cell.walls.east && current.x + 1 < maze.cols)
    neighbors.push({ x: current.x + 1, y: current.y });
  if (!cell.walls.south && current.y + 1 < maze.rows)
    neighbors.push({ x: current.x, y: current.y + 1 });
  if (!cell.walls.west && current.x - 1 >= 0)
    neighbors.push({ x: current.x - 1, y: current.y });

  return neighbors;
}
