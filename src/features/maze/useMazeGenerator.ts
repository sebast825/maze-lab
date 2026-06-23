import { useState } from "react";
import { AlgorithmType, mazesGenerator } from "@/lib/alogirthms/generation";
import { createLopps } from "@/lib/alogirthms/generation/loop/loops";
import { bfs } from "@/lib/alogirthms/solving/bfs";
import { findAllPaths } from "@/lib/alogirthms/solving/dfs";
import { BFSResult } from "@/lib/alogirthms/solving/types";
import { MazeData, Position } from "@/lib/maze/types";
import { createEmptyMaze } from "@/lib/maze/core";

export const useMazeGenerator = () => {
  const [mazeData, setMazeData] = useState<MazeData | null>(null);

  const createMaze = (algorithm: AlgorithmType, rows: number, cols: number) :MazeData => {
    rows = Math.max(2, rows);
    cols = Math.max(2, cols);

   const maze  = mazesGenerator[algorithm](createEmptyMaze(rows, cols));
    const start: Position = { row: 0, col: 0 };
    const end: Position = { row: rows - 1, col: cols - 1 };



    createLopps(start, end, maze);

    const solution = findAllPaths(maze, start, end);
    const rsta = {
           maze,
      start,
      end,
      solution,
    }
    setMazeData(rsta);
    return rsta;
  };

  return {
    mazeData,
    createMaze,
  };
};
