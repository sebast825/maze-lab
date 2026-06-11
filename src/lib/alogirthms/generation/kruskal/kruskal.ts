import { removeWallBetween } from "@/lib/maze/walls";
import { getWallsWithNeighbor, union } from "./utils";
import { Maze } from "@/lib/maze/types";

/*
 * Kruskal's algorithm for maze generation:
 * 1. Generate list of all walls between adjacent cells
 * 2. Shuffle walls randomly
 * 3. Initialize Union-Find: each cell is its own set (parent)
 * 4. For each wall in random order:
 *    - Find sets of both cells
 *    - If they belong to different sets:
 *        - Remove the wall
 *        - Union the two sets into one
 * 5. Repeat until all cells are connected (implicitly when all walls processed)
 */

export function generateKruskal(maze: Maze): Maze {
  const walls = getWallsWithNeighbor(maze);
  walls.sort(() => Math.random() - 0.5);
  const totalCells = maze.rows * maze.cols;
  //initialize all, at the end all will be part of the same group
  const parent: number[] = Array(totalCells)
    .fill(0)
    .map((_, i) => i);


  for (const wall of walls) {
    //create a unique id for each cell
    const cell1Id = wall.cell1.row * maze.cols + wall.cell1.col;
    const cell2Id = wall.cell2.row * maze.cols + wall.cell2.col;
    if (union(parent, cell1Id, cell2Id)) {
      removeWallBetween(
        maze,
        { row: wall.cell1.row, col: wall.cell1.col },
        { row: wall.cell2.row, col: wall.cell2.col },
      );
    }
  }
  return maze;
}

