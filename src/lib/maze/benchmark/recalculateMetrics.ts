import { bfs, reconstructPath } from "@/lib/alogirthms/solving/bfs";
import { BFSResult } from "@/lib/alogirthms/solving/types";
import { computeMazeMetrics } from "../metrics";
import { Position } from "../types";
import { MazeBenchmark } from "./types";
import { findAllPaths } from "@/lib/alogirthms/solving/dfs";
import { MazeScoringResult } from "../metrics/scoring/types";

export const recalculateBenchmarkMetrics = (
  benchmarks: MazeBenchmark[],
): MazeBenchmark[] => {
  return benchmarks.map((benchmark) => {
    const maze = benchmark.maze;

    const start: Position = {
      row: 0,
      col: 0,
    };

    const end: Position = {
      row: maze.rows - 1,
      col: maze.cols - 1,
    };

    const { cellInfo, shortest }: BFSResult = bfs(
      maze,
      end,
      start,
    );

    const shortestPath :Position[] = reconstructPath(
      cellInfo,
      shortest,
    );

    const metrics : MazeScoringResult = computeMazeMetrics(
      cellInfo,
      maze,
      benchmark.paths,
      shortestPath.length,
    );

    return {
      ...benchmark,
      metrics: metrics.raw
    };
  });
};