import { Maze, Position } from "@/lib/maze/types";
import {
  getMazeStartPoint,
  getNeighbors,
  removeWallBetween,
  selectRandomPosition,
} from "@/lib/maze/utils";
import { MazeGeneratorFn } from "./types";

/**
 * Worm Algorithm
 * A variation of the 'Growing Tree' algorithm that expands the maze using
 * random segments (worms). It selects a start point from the stack and
 * performs a constrained random walk, ensuring full connectivity by
 * branching from previously visited cells.
 */

export const generateWorms: MazeGeneratorFn = (maze: Maze): Maze => {
  const startPoint: Position = getMazeStartPoint(maze);

  let unvisitedCells: Position[] = [];
  for (let r = 0; r < maze.rows; r++) {
    for (let c = 0; c < maze.cols; c++) {
      unvisitedCells.push({ row: r, col: c });
    }
  }

  const wormMaxLength: number = 4;
  let currentWorm: number = 0;
  let current: Position = startPoint;
  const removeUnvisited = (pos: Position) => {
    const index = unvisitedCells.findIndex(
      (p) => p.row === pos.row && p.col === pos.col,
    );
    if (index !== -1) {
      unvisitedCells[index] = unvisitedCells[unvisitedCells.length - 1];
      unvisitedCells.pop();
    }
  };
  while (unvisitedCells.length > 0) {
    while (currentWorm < wormMaxLength) {
      const neighbors: Position[] = getNeighbors(maze, {
        row: current.row,
        col: current.col,
      });
      removeUnvisited(current);
      if (neighbors.length === 0) {
        const randomIndex = Math.floor(Math.random() * unvisitedCells.length);
        current = unvisitedCells[randomIndex];
        maze.cells[current.row][current.col].visited = true;

        break;
      }
      // We only connect to unvisited cells to avoid unnecessary loops
      const neighbor: Position = selectRandomPosition(neighbors);
      if (!maze.cells[neighbor.row][neighbor.col].visited) {
        removeWallBetween(maze, current, neighbor);
      }
      maze.cells[current.row][current.col].visited = true;
      maze.cells[neighbor.row][neighbor.col].visited = true;

      current = neighbor;

      currentWorm++;
    }
    currentWorm = 0;
  }

  return maze;
};
