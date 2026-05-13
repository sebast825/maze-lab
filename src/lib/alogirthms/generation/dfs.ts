//DFS (Depth-First Search) with backtracking.

import { Cell, Maze } from "@/lib/maze/types";
import { getMazeStartPoint, getValidNeighbors, removeWallBetween, selectRandomNeighbor } from "@/lib/maze/utils";

export function createMazeSizeDFS(width: number, height: number): Maze {
  const cells: Cell[][] = [];

  for (let y = 0; y < height; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < width; x++) {
      row.push({
        visited: false,
        walls: {
          north: true,
          east: true,
          south: true,
          west: true,
        },
      });
    }
    cells.push(row);
  }
  return { rows: height, cols: width, cells };
}

export function handleMazeGenerationDFS(maze: Maze): Maze {
   // Step 1: Choose a random starting point and mark it as visited.
  const startPoint: { x: number; y: number } = getMazeStartPoint(maze);
  const stack: { x: number; y: number }[] = [];
  stack.push({ x: startPoint.x, y: startPoint.y });
  maze.cells[startPoint.y][startPoint.x].visited = true;

  // Step 2: While there are unvisited cells, do the following:
  do {
    const neighbors = getValidNeighbors(
      maze,
      stack[stack.length - 1].x,
      stack[stack.length - 1].y,
    );
    // Step 3: If the current cell has any unvisited neighbors,
    //  choose one at random, remove the wall between the current cell and the chosen neighbor,
    //  and mark the chosen neighbor as visited. Push the chosen neighbor onto the stack.
    // Otherwise, if the current cell has no unvisited neighbors, pop a cell from the stack.
    if (neighbors.length === 0) {
      stack.pop();
      continue;
    }
    const neighbor = selectRandomNeighbor(neighbors);

    removeWallBetween(maze, stack[stack.length - 1], neighbor);
    maze.cells[neighbor.y][neighbor.x].visited = true;
    stack.push(neighbor);
  } while (stack.length > 0);

  return maze;
}

