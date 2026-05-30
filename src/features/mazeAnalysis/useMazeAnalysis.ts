import { MazeData, Position } from "@/lib/maze/types";
import { useEffect, useState } from "react";
import { MazeBenchmark } from "@/features/mazeAnalysis/benchmarkData/types";

import {
  MazeRawMetrics,
  MazeScoringResult,
  Weights,
} from "@/lib/maze/metrics/scoring/types";
import { analyzeMaze } from "@/lib/maze/metrics/scoring/scoring";

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
      mazeDifficultyFeatures,
      pathsMetrics,
      pathOverlapMetrics,
      totalIntersections,
      shortestPathLength,
      totalPaths,
    } = mazeBenchmark.metrics;

    setRawData({
      features: mazeDifficultyFeatures,
      paths: pathsMetrics,
      overlaps: pathOverlapMetrics,
      totalIntersections,
      shortestPathLength,
      totalPaths,
    });
  };
  useEffect(() => {
    console.log(weights)
    if (!rawData) return;
    setMazeScoreResult(analyzeMaze(rawData, weights));
  }, [rawData, weights]);

  return { mazeData, createMaze, mazeScoreResult };
};
