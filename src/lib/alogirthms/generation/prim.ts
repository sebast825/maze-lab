import { Maze, Position } from "@/lib/maze/types";
import {
  getMazeStartPoint,
  getNeighborsNotVisited,
  removeWallBetween,
  selectRandomPosition,
} from "@/lib/maze/utils";
import { MazeGeneratorFn } from "./types";
/**
 * Prim's algorithm for maze generation.
 *
 * Grows a maze by maintaining a frontier of cells adjacent to the visited set.
 * Randomly selects a frontier cell and connects it to a random visited neighbor,
 * then adds its unvisited neighbors to the frontier.
 *
 * Results in mazes with many short branches and uniform distribution
 */
export const generatePrim: MazeGeneratorFn = (maze: Maze): Maze => {
  const startPoint: Position = getMazeStartPoint(maze);
  const stack: Position[] = [];
  stack.push({ row: startPoint.row, col: startPoint.col });
  maze.cells[startPoint.row][startPoint.col].visited = true;

  while (stack.length > 0) {
    const current: Position = selectRandomPosition(stack);
    const index = stack.findIndex(
      (p) => p.row === current.row && p.col === current.col,
    );

    const neighbors: Position[] = getNeighborsNotVisited(
      maze,
      {row:current.row,
      col:current.col,}
    );

    if (neighbors.length === 0 && index !== -1) {
      stack.splice(index, 1);
      continue;
    }
    const neighbor: Position = selectRandomPosition(neighbors);
    stack.push(neighbor);

    removeWallBetween(maze, stack[index], neighbor);
    maze.cells[neighbor.row][neighbor.col].visited = true;
  }
  return maze;
};
