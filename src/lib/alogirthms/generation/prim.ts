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
  stack.push({ x: startPoint.x, y: startPoint.y });
  maze.cells[startPoint.x][startPoint.y].visited = true;

  while (stack.length > 0) {
    const current: Position = selectRandomPosition(stack);
    const index = stack.findIndex(
      (p) => p.x === current.x && p.y === current.y,
    );

    const neighbors: Position[] = getNeighborsNotVisited(
      maze,
      current.x,
      current.y,
    );

    if (neighbors.length === 0 && index !== -1) {
      stack.splice(index, 1);
      continue;
    }
    const neighbor: Position = selectRandomPosition(neighbors);
    stack.push(neighbor);

    removeWallBetween(maze, stack[index], neighbor);
    maze.cells[neighbor.x][neighbor.y].visited = true;
  }
  return maze;
};
