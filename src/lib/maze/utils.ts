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
  return { rows: height, cols: width, cells };
}

export function getMazeStartPoint(maze: Maze) {
  const startX = Math.floor(Math.random() * maze.cols);
  const startY = Math.floor(Math.random() * maze.rows);
  return { x: startX, y: startY };
}

export function getNeighborsNotVisited(
  maze: Maze,
  x: number,
  y: number,
): Position[] {
  const neighbors = [];

  const north = { x, y: y - 1 };
  const east = { x: x + 1, y };
  const south = { x, y: y + 1 };
  const west = { x: x - 1, y };
  if (isCellInBoundsAndUnvisited(maze, north.x, north.y)) neighbors.push(north);
  if (isCellInBoundsAndUnvisited(maze, east.x, east.y)) neighbors.push(east);
  if (isCellInBoundsAndUnvisited(maze, south.x, south.y)) neighbors.push(south);
  if (isCellInBoundsAndUnvisited(maze, west.x, west.y)) neighbors.push(west);

  return neighbors;
}

function isCellInBoundsAndUnvisited(maze: Maze, x: number, y: number): boolean {
  return (
    x >= 0 &&
    x < maze.cols &&
    y >= 0 &&
    y < maze.rows &&
    !maze.cells[y][x].visited
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
  if (current.x === next.x) {
    if (current.y > next.y) {
      maze.cells[current.y][current.x].walls.north = false;
      maze.cells[next.y][next.x].walls.south = false;
    } else {
      maze.cells[current.y][current.x].walls.south = false;
      maze.cells[next.y][next.x].walls.north = false;
    }
  }
  // if cells are in the same column then we need to remove north/south wall
  else {
    if (current.x > next.x) {
      maze.cells[current.y][current.x].walls.west = false;
      maze.cells[next.y][next.x].walls.east = false;
    } else {
      maze.cells[current.y][current.x].walls.east = false;
      maze.cells[next.y][next.x].walls.west = false;
    }
  }
}
