import { MazeData, Position } from "@/lib/maze/types";
import { useState } from "react";
import { MazeBenchmark } from "@/features/mazeAnalysis/benchmarkData/types";

export const useMazeAnalysis = () => {
  const [mazeData, setMazeData] = useState<MazeData | null>(null);

  const createMaze = (mazeBenchmark: MazeBenchmark) => {
    let end: Position = {
      row: mazeBenchmark.maze.rows - 1,
      col: mazeBenchmark.maze.cols - 1,
    };
    let start: Position = { row: 0, col: 0 };

    const newMazeData: MazeData = {
      maze: mazeBenchmark.maze,
      start,
      end,
      solution: mazeBenchmark.paths,
    };
    setMazeData(newMazeData);
  };

  return { mazeData, createMaze };
};
