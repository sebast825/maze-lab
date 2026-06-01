import { MazeRawMetrics } from "@/lib/maze/metrics/scoring/types";
import { AlgorithmType } from "../../../lib/alogirthms/generation";
import { Maze, Position } from "../../../lib/maze/types";

export interface MazeBenchmark {
  name: string;
  id: number;
  algorithm: AlgorithmType;
  maze: Maze;
  paths: Position[][];
  metrics: MazeRawMetrics;
}
