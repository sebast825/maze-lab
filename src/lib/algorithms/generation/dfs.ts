//DFS (Depth-First Search) with backtracking.

import { Maze, Position } from "@/lib/maze/types";
import {
  getMazeStartPoint,
  getNeighborsNotVisited,
  selectRandomPosition,
} from "@/lib/maze/core";
import { MazeGeneratorFn } from "./types";
import { removeWallBetween } from "@/lib/maze/walls";

export const generateDFS: MazeGeneratorFn = (maze: Maze): Maze => {
  // Step 1: Choose a random starting point and mark it as visited.
  const startPoint: Position = getMazeStartPoint(maze);
  const stack: Position[] = [];
  stack.push({ row: startPoint.row, col: startPoint.col });
  maze.cells[startPoint.row][startPoint.col].visited = true;

  // Step 2: While there are unvisited cells, do the following:
  do {
    const neighbors = getNeighborsNotVisited(maze, {
      row: stack[stack.length - 1].row,
      col: stack[stack.length - 1].col,
    });
    // Step 3: If the current cell has any unvisited neighbors,
    //  choose one at random, remove the wall between the current cell and the chosen neighbor,
    //  and mark the chosen neighbor as visited. Push the chosen neighbor onto the stack.
    // Otherwise, if the current cell has no unvisited neighbors, pop a cell from the stack.
    if (neighbors.length === 0) {
      stack.pop();
      continue;
    }
    const neighbor = selectRandomPosition(neighbors);

    removeWallBetween(maze, stack[stack.length - 1], neighbor);
    maze.cells[neighbor.row][neighbor.col].visited = true;
    stack.push(neighbor);
  } while (stack.length > 0);

  return maze;
};
