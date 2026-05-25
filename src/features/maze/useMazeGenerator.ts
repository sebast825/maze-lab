import { AlgorithmType, mazesGenerator } from "@/lib/alogirthms/generation";
import { createLopps } from "@/lib/alogirthms/generation/loop/loops";
import { bfs } from "@/lib/alogirthms/solving/bfs";
import { findAllPaths } from "@/lib/alogirthms/solving/dfs";
import { BFSResult } from "@/lib/alogirthms/solving/types";
import { MazeData, Position } from "@/lib/maze/types";
import { createEmptyMaze } from "@/lib/maze/core";
import { useState } from "react";

export const useMazeGenerator = () => {
  const [mazeData, setMazeData] = useState<MazeData | null>(null);

  const createMaze = (algorithm: AlgorithmType, rows: number, cols: number) => {
    if (rows < 2) rows = 2;
    if (cols < 2) cols = 2;
    const maze = mazesGenerator[algorithm](createEmptyMaze(rows, cols));
    let end: Position = { row: rows - 1, col: cols - 1 };
    let start: Position = { row: 0, col: 0 };

    const { cellInfo, farthest }: BFSResult = bfs(maze, end);
    start = {
      row: 0,
      col: 0,
    };
    createLopps(cellInfo, start, end, maze);

    var rstaPaths: Position[][] = findAllPaths(maze, start, end);

    const newMazeData: MazeData = {
      maze,
      start,
      end,
      solution: rstaPaths,
    };
    setMazeData(newMazeData);
  };

  return { mazeData, createMaze };
};
