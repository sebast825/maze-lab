import { Geist, Rowdies } from "next/font/google";
import { Cell, Maze, Position } from "./types";

export function createEmptyMaze(width: number, height: number): Maze {
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
  console.log("emptyMaze rows:", height, "cols:", width, cells);
  return { rows: height, cols: width, cells };
}

export function getMazeStartPoint(maze: Maze): Position {
  const row = Math.floor(Math.random() * maze.rows);
  const col = Math.floor(Math.random() * maze.cols);
  return { row,col };
}

export function getNeighborsNotVisited(
  maze: Maze,
  position: Position,
): Position[] {
  const neighbors = [];

  const north = { row: position.row - 1, col: position.col };
  const east = { row: position.row, col: position.col + 1 };
  const south = { row: position.row + 1, col: position.col };
  const west = { row: position.row, col: position.col - 1 };
  if (isCellInBoundsAndUnvisited(maze, north)) neighbors.push(north);
  if (isCellInBoundsAndUnvisited(maze, east)) neighbors.push(east);
  if (isCellInBoundsAndUnvisited(maze, south)) neighbors.push(south);
  if (isCellInBoundsAndUnvisited(maze, west)) neighbors.push(west);

  return neighbors;
}

function isCellInBoundsAndUnvisited(maze: Maze, position: Position): boolean {
  return (
    position.row >= 0 &&
    position.row < maze.rows &&
    position.col >= 0 &&
    position.col < maze.cols &&
    !maze.cells[position.row][position.col].visited
  );
}

export function getNeighbors(maze: Maze, position: Position): Position[] {
  const neighbors = [];
  const north = { row: position.row - 1, col: position.col };
  const east = { row: position.row, col: position.col + 1 };
  const south = { row: position.row + 1, col: position.col };
  const west = { row: position.row, col: position.col - 1 };
  if (isCellInBounds(maze, north)) neighbors.push(north);
  if (isCellInBounds(maze, east)) neighbors.push(east);
  if (isCellInBounds(maze, south)) neighbors.push(south);
  if (isCellInBounds(maze, west)) neighbors.push(west);

  return neighbors;
}

function isCellInBounds(maze: Maze, position: Position): boolean {
  return (
    position.row >= 0 &&
    position.row < maze.rows &&
    position.col >= 0 &&
    position.col < maze.cols
  );
}

export function selectRandomPosition(neighbors: Position[]): Position {
  const randomIndex = Math.floor(Math.random() * neighbors.length);
  return neighbors[randomIndex];
}


export function removeWallBetween(
  maze: Maze,
  current: Position,
  next: Position,
) {
  // if cells are in the same row then we need to remove east/west wall
  if (current.row === next.row) {
    if (current.col > next.col) {
      maze.cells[current.col][current.row].walls.north = false;
      maze.cells[next.col][next.row].walls.south = false;
    } else {
      maze.cells[current.col][current.row].walls.south = false;
      maze.cells[next.col][next.row].walls.north = false;
    }
  }
  // if cells are in the same column then we need to remove north/south wall
  else {
    if (current.row > next.row) {
      maze.cells[current.col][current.row].walls.west = false;
      maze.cells[next.col][next.row].walls.east = false;
    } else {
      maze.cells[current.col][current.row].walls.east = false;
      maze.cells[next.col][next.row].walls.west = false;
    }
  }
}
