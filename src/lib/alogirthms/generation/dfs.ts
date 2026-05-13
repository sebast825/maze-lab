//DFS (Depth-First Search) with backtracking.

import { Cell, Maze } from "@/lib/maze/types";

//definimos el tamaño de la grilla
//agregamos las cells a maze
//elegimos una al azar

export function createMazeSizeDFS(width: number, height: number): Maze {
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
          west: true
        }
      });
    }
    cells.push(row);
   }
   return { rows: height, cols: width, cells };
}

function handleMazeGenerationDFS(maze: Maze) {

}