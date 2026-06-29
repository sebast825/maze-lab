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


export function getNeighborsByOpenWall(
  maze: Maze,
  current: Position,
): Position[] {
  const neighbors: Position[] = [];
  const cell = maze.cells[current.row][current.col];

  // NORTH: First boundaries, then the existing wall, then the neighbor's wall
  if (
    current.row - 1 >= 0 &&
    !cell.walls.north &&
    !maze.cells[current.row - 1][current.col].walls.south
  ) {
    neighbors.push({ row: current.row - 1, col: current.col });
  }

  // SOUTH: First boundaries, then current wall, then neighbor's wall  
  if (
    current.row + 1 < maze.rows &&
    !cell.walls.south &&
    !maze.cells[current.row + 1][current.col].walls.north
  ) {
    neighbors.push({ row: current.row + 1, col: current.col });
  }

  // EAST: First boundary line, then existing wall, then neighbor's wall
  if (
    current.col + 1 < maze.cols &&
    !cell.walls.east &&
    !maze.cells[current.row][current.col + 1].walls.west
  ) {
    neighbors.push({ row: current.row, col: current.col + 1 });
  }

  // WEST: First boundaries, then current wall, then neighbor's wall
  if (
    current.col - 1 >= 0 &&
    !cell.walls.west &&
    !maze.cells[current.row][current.col - 1].walls.east
  ) {
    neighbors.push({ row: current.row, col: current.col - 1 });
  }

  return neighbors;
}

export const getNeighborsByOpenWallNotVisited = (maze: Maze,
  current: Position) => {
  const neighbors: Position[] = getNeighborsByOpenWall(maze, current)
  return neighbors.filter(neighbor => !maze.cells[neighbor.row][neighbor.col].visited)
}