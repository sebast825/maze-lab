import { bfs, reconstructPath } from "@/lib/algorithms/solving/bfs";
import { BFSResult } from "@/lib/algorithms/solving/types";
import {  computeRawMetrics } from "../../metrics";
import { Position } from "../../maze/types";
import { MazeBenchmark } from "./types";
import { MazeRawMetrics } from "../../metrics/scoring/types";

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

    const metrics : MazeRawMetrics = computeRawMetrics(
      cellInfo,
      maze,
      benchmark.paths
    );
    return {
      ...benchmark,
      metrics
    };
  });
};