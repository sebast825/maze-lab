import { Maze, Position } from "@/lib/maze/types";
import {
  getMazeStartPoint,
  getNeighborsNotVisited,
  getNeighbors,
  selectRandomPosition,
} from "@/lib/maze/core";
import { MazeGeneratorFn } from "./types";
import { setWallBetween } from "@/lib/maze/walls";

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
  maze.cells[startPoint.row][startPoint.col].visited = true;

  const frontier: Position[] = [];
  const stack: Position[] = []; // Acts as the visited set
  stack.push(startPoint);

  // Initialize frontier with starting point's unvisited neighbors
  const initialNeighbors = getNeighborsNotVisited(maze, startPoint);
  initialNeighbors.forEach((neighbor) => frontier.push(neighbor));

  while (frontier.length > 0) {
    // 1. Pick and remove a random cell from the frontier
    const current: Position = selectRandomPosition(frontier);
    const indexFrontier = frontier.findIndex(
      (p) => p.row === current.row && p.col === current.col,
    );
    if (indexFrontier !== -1) {
      frontier.splice(indexFrontier, 1);
    }

    // Skip if somehow it was already visited and processed
    if (maze.cells[current.row][current.col].visited) continue;
    maze.cells[current.row][current.col].visited = true;

    // 2. Find adjacent neighbors that are already in the maze (stack)
    const neighbors: Position[] = getNeighbors(maze, current);
    const neighborsInStack: Position[] = neighbors.filter((neighbor) =>
      stack.some((stackPos) => stackPos.col === neighbor.col && stackPos.row === neighbor.row),
    );

    if (neighborsInStack.length === 0) continue;

    // 3. Connect to a random visited neighbor
    const chosenNeighbor: Position = selectRandomPosition(neighborsInStack);
    setWallBetween(maze, current, chosenNeighbor);
    stack.push(current);

    // 4. Add new unvisited neighbors to frontier, avoiding duplicates
    const nextNeighbors = getNeighborsNotVisited(maze, current);
    nextNeighbors.forEach((neighbor) => {
      const alreadyInFrontier = frontier.some(
        (p) => p.row === neighbor.row && p.col === neighbor.col,
      );
      if (!alreadyInFrontier) {
        frontier.push(neighbor);
      }
    });
  }

  return maze;
};