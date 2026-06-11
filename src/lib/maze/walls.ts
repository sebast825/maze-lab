import { Maze, Position } from "./types";

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


export function removeWallBetween(
  maze: Maze,
  current: Position,
  next: Position,
) {
  // if cells are in the same row then we need to remove east/west wall
  if (current.row === next.row && current.col != next.col) {
    //east/west
    if (current.col - next.col === 1) {
      maze.cells[current.row][current.col].walls.west = false;
      maze.cells[next.row][next.col].walls.east = false;
      return;
    }
    if (next.col - current.col === 1) {
      maze.cells[current.row][current.col].walls.east = false;
      maze.cells[next.row][next.col].walls.west = false;
      return;
    }
  }
  // if cells are in the same column then we need to remove north/south wall
  if (current.col === next.col && current.row != next.row) {
    //north/south
    if (current.row - next.row === 1) {
      maze.cells[current.row][current.col].walls.north = false;
      maze.cells[next.row][next.col].walls.south = false;
      return;
    }
    if (next.row - current.row === 1) {
      maze.cells[current.row][current.col].walls.south = false;
      maze.cells[next.row][next.col].walls.north = false;
      return;
    }
  }
}
