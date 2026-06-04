import { algorithmNames, AlgorithmType, mazesGenerator } from "@/lib/alogirthms/generation";
import { createLopps } from "@/lib/alogirthms/generation/loop/loops";
import { bfs, reconstructPath } from "@/lib/alogirthms/solving/bfs";
import { findAllPaths } from "@/lib/alogirthms/solving/dfs";
import { MazeBenchmark } from "../benchmark/types";
import { createEmptyMaze } from "../core";
import { computeMazeMetrics } from "../metrics";
import { Position } from "../types";

export const generateBenchmark = (
  algorithm: AlgorithmType,
  rows: number,
  cols: number,
  id: number,
): MazeBenchmark => {
  const maze = mazesGenerator[algorithm](createEmptyMaze(rows, cols));

  const start: Position = {
    row: 0,
    col: 0,
  };

  const end: Position = {
    row: rows - 1,
    col: cols - 1,
  };

  const { cellInfo } = bfs(maze, end, start);

  createLopps(cellInfo, start, end, maze);

  const paths = findAllPaths(maze, start, end);

  const { cellInfo: finalCellInfo, shortest } = bfs(maze, end, start);

  const shortestPath = reconstructPath(finalCellInfo, shortest);

  const metrics = computeMazeMetrics(
    finalCellInfo,
    maze,
    paths,
    shortestPath.length,
  );

  return {
    id,
    name: `${algorithm}-${id}`,
    algorithm,
    maze,
    paths,
    metrics: metrics.raw,
  };
};

export const generateBenchmarks = (
  rows: number,
  cols: number,
  samplesPerAlgorithm: number,
): MazeBenchmark[] => {
  let id = 1;

  const result: MazeBenchmark[] = [];

  for (const algorithm of Object.values(
    algorithmNames,
  )) {
    for (
      let i = 0;
      i < samplesPerAlgorithm;
      i++
    ) {
      result.push(
        generateBenchmark(
          algorithm,
          rows,
          cols,
          id++,
        ),
      );
    }
  }

  return result;
};