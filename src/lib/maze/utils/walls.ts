import { Maze, Position } from "../types";

export function hasWallWithNeighbor(
  maze: Maze,
  current: Position,
  neighbor: Position,
): boolean {
  // if cells are in the same row and walls open return true
  if (current.row === neighbor.row && current.col != neighbor.col) {
    //east/west
    if (current.col - neighbor.col === 1) {
      let currentWall = maze.cells[current.row][current.col].walls.west;
      let neighborWall = maze.cells[neighbor.row][neighbor.col].walls.east;

      return currentWall && neighborWall;
    }
    if (neighbor.col - current.col === 1) {
      let currentWall = maze.cells[current.row][current.col].walls.east;
      let neighborWall = maze.cells[neighbor.row][neighbor.col].walls.west;
      return currentWall && neighborWall;
    }
  }
  // if cells are in the same column and walls open return true
  if (current.col === neighbor.col && current.row != neighbor.row) {
    //north/south
    if (current.row - neighbor.row === 1) {
      let currentWall = maze.cells[current.row][current.col].walls.north;
      let neighborWall = maze.cells[neighbor.row][neighbor.col].walls.south;
      return currentWall && neighborWall;
    }
    if (neighbor.row - current.row === 1) {
      let currentWall = maze.cells[current.row][current.col].walls.south;
      let neighborWall = maze.cells[neighbor.row][neighbor.col].walls.north;
      return currentWall && neighborWall;
    }
  }
  return false;
}