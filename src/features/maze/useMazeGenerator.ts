import {
  algorithmNames,
  AlgorithmType,
  mazesGenerator,
} from "@/lib/alogirthms/generation";
import { createLopps } from "@/lib/alogirthms/generation/loop/loops";
import { bfs } from "@/lib/alogirthms/solving/bfs";
import { BFSResult } from "@/lib/alogirthms/solving/types";
import { MazeData, Position } from "@/lib/maze/types";
import { createEmptyMaze } from "@/lib/maze/utils";
import { useState } from "react";

export const useMazeGenerator = () => {
  const [mazeData, setMazeData] = useState<MazeData | null>(null);

  const createMaze = (algorithm: AlgorithmType, rows: number, cols: number) => {
    if (rows < 2) rows = 2;
    if (cols < 2) cols = 2;
    const maze = mazesGenerator[algorithm](createEmptyMaze(rows, cols));
    let end: Position = { row: 0, col: Math.round(2) };
    let start: Position = { row: 0, col: 0 };

    const { cellInfo, farthest }: BFSResult = bfs(maze, {
      row: 0,
      col: end.col,
    });

    let current: Position | null = farthest;
    const reconstructedPath: Position[] = [];
    while (current) {
      reconstructedPath.unshift(current);

      current = cellInfo[current.row]?.[current.col].parent || null;
      if (current && current.row == end.row && current.col == end.col) {
        const removeExtraPositions = Math.round(reconstructedPath.length / 3);
        start = {
          row: reconstructedPath[reconstructedPath.length - 1].row,
          col: reconstructedPath[reconstructedPath.length - 1].col,
        };

        break;
      }
    }
 createLopps({ cellInfo, farthest }, end, maze)
    const newMazeData: MazeData = {
        maze,   
      start,
      end,
      solution: reconstructedPath,
    };
      setMazeData(newMazeData);
  };

  return { mazeData, createMaze };
};

/*
6. Corrección de tu flujo mental

Lo correcto sería:

BFS → obtengo estructura global
reconstruyo backbone
clasifico celdas:
backbone
ramas
intersecciones (por degree)
recién ahí analizás loops / ruido





function findNearestBackboneAncestor(cell):
    current = cell
    steps = 0

    while current exists:
        if current in backboneSet:
            return { position: current, distance: steps }

        current = parent[current]
        steps++

*/
