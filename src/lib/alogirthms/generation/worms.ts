import { Maze, Position } from "@/lib/maze/types";
import {
  getMazeStartPoint,
  getNeighborsNotVisited,
  selectRandomPosition,
} from "@/lib/maze/core";
import { MazeGeneratorFn } from "./types";
import { connectDisconnectedRegions } from "./ensureConnectivity";
import { removeWallBetween } from "@/lib/maze/walls";

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
  const wormMaxLength: number = 12;

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
  let wormId = 0 ;
  while (unvisitedCells.length > 0) {
    wormId++;
    while (currentWorm < wormMaxLength) {
      removeUnvisited(current);
       maze.cells[current.row][current.col].groupId = wormId;
      maze.cells[current.row][current.col].visited = true;

      const neighbors: Position[] = getNeighborsNotVisited(maze, {
        row: current.row,
        col: current.col,
      });
      if (neighbors.length != 0) {
        const neighbor: Position = selectRandomPosition(neighbors);
        removeWallBetween(maze, current, neighbor);

        current = neighbor;
        currentWorm++;
      } else {
        if (unvisitedCells.length == 0) break;
        const randomIndex = Math.floor(Math.random() * unvisitedCells.length);
        current = unvisitedCells[randomIndex];
        break;
      }
    }
    currentWorm = 0;
  }

  return connectDisconnectedRegions(maze);
};

