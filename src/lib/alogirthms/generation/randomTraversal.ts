import { Maze, Position } from "@/lib/maze/types";
import {
  getMazeStartPoint,
  getNeighborsNotVisited,
  selectRandomPosition,
} from "@/lib/maze/core";
import { MazeGeneratorFn } from "./types";
import { removeWallBetween } from "@/lib/maze/walls";


/**
 * Random Traversal Algorithm (Modified DFS)
 * * 1. Take a random initial point and push it to the stack.
 * 2. While there are cells in the stack:
 * - Select a random position from the stack.
 * - Get its unvisited neighbors.
 * - If it has neighbors:
 * - Select one random neighbor.
 * - Remove the wall between the current position and the neighbor.
 * - Mark the neighbor as visited and push it to the stack.
 * - If it has no unvisited neighbors, remove the current position from the stack.
 */
export const generateRandomTraversal: MazeGeneratorFn = (maze: Maze): Maze => {
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
