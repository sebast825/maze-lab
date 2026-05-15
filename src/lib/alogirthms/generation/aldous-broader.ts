import { Maze, Position } from "@/lib/maze/types";
import {
  getMazeStartPoint,
  getNeighbors,
  getNeighborsNotVisited,
  removeWallBetween,
  selectRandomPosition,
} from "@/lib/maze/utils";
import { MazeGeneratorFn } from "./types";

/*
 1 select a random start point and mark as visited and current
 2 choose a random neighbor,
   3- if the neighbor is not visited 
      -remove wall between them 
      - mark neighbor as visited
 4- set neighbor as current
 5 - repeat steps 3-5 until all cells are visited
*/

export const generateAldousBroader : MazeGeneratorFn =(maze: Maze): Maze => {
  const startPoint: Position = getMazeStartPoint(maze);

  maze.cells[startPoint.x][startPoint.y].visited = true;
  let current: Position = startPoint;
  const totalCells = maze.rows * maze.cols;
  let visitedCellsCount = 1;

  while (visitedCellsCount < totalCells) {
    const neighbors = getNeighbors(maze, current.x, current.y);

    const neighbor: Position = selectRandomPosition(neighbors);

    const isNeighborVisited: boolean =
      maze.cells[neighbor.x][neighbor.y].visited;
    if (!isNeighborVisited) {
      removeWallBetween(maze, current, neighbor);
      maze.cells[neighbor.x][neighbor.y].visited = true;
      visitedCellsCount++;
    }
    current = neighbor;
  }
  return maze;
}
