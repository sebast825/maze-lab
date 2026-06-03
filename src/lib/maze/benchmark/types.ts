import { MazeRawMetrics } from "@/lib/maze/metrics/scoring/types";
import { AlgorithmType } from "../../alogirthms/generation";
import { Maze, Position } from "../types";

export interface MazeBenchmark {
  name: string;
  id: number;
  algorithm: AlgorithmType;
  maze: Maze;
  paths: Position[][];
  metrics: MazeRawMetrics;
}
