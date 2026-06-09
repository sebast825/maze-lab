import { MazeData, Position } from "@/lib/maze/types";
import { useEffect, useState } from "react";

import {
  MazeRawMetrics,
  MazeScoringResult,
  Weights,
} from "@/lib/maze/metrics/scoring/types";
import { analyzeMaze } from "@/lib/maze/metrics/scoring/scoring";
import { MazeBenchmark } from "@/lib/maze/benchmark/types";
import { getClosestSizeKey } from "@/lib/maze/metrics/normalize/mazeSizeSpecs";

export const useMazeAnalysis = (weights: Weights) => {
  const [mazeData, setMazeData] = useState<MazeData | null>(null);
  const [rawData, setRawData] = useState<MazeRawMetrics | null>(null);

  const [mazeScoreResult, setMazeScoreResult] =
    useState<MazeScoringResult | null>(null);

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
    const {
      features,
      paths,
      pathsAlternative,
      totalIntersections,
      shortestPathLength,
      totalPaths,
    } = mazeBenchmark.metrics;

    setRawData({
      features: features,
      paths: paths,
      pathsAlternative,
      totalIntersections,
      shortestPathLength,
      totalPaths,
    });
  };
  useEffect(() => {
    if (!rawData || !mazeData) return;
    setMazeScoreResult(
      analyzeMaze(
        rawData,
        weights,
        getClosestSizeKey(mazeData.maze.rows * mazeData.maze.rows),
      ),
    );
  }, [rawData, weights]);

  return { mazeData, createMaze, mazeScoreResult };
};
