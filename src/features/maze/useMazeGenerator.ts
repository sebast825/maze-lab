import { AlgorithmType, mazesGenerator } from "@/lib/alogirthms/generation";
import { createLopps } from "@/lib/alogirthms/generation/loop/loops";
import { bfs } from "@/lib/alogirthms/solving/bfs";
import { findAllPaths } from "@/lib/alogirthms/solving/dfs";
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

    createLopps({ cellInfo, farthest }, end, maze);
    start = {
      row: farthest.row,
      col: farthest.col,
    };

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
