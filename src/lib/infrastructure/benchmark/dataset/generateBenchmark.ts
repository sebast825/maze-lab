import {
  algorithmNames,
  AlgorithmType,
  mazesGenerator,
} from "@/lib/algorithms/generation";
import { createLopps } from "@/lib/algorithms/loop/loops";
import { bfs } from "@/lib/algorithms/solving/bfs";
import { findAllPaths } from "@/lib/algorithms/solving/dfs";
import { MazeBenchmark } from "../types";
import { createEmptyMaze } from "../../../maze/core";
import { computeMazeMetrics } from "../../../metrics";
import { Position } from "../../../maze/types";

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


  createLopps(start, end, maze);

  const paths = findAllPaths(maze, start, end);

  const { cellInfo } = bfs(maze, end, start);

  const metrics = computeMazeMetrics(cellInfo, maze, paths);

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

  for (const algorithm of Object.values(algorithmNames)) {
    for (let i = 0; i < samplesPerAlgorithm; i++) {
      result.push(generateBenchmark(algorithm, rows, cols, id++));
    }
  }

  return result;
};
