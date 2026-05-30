import { AlgorithmType } from "../../../lib/alogirthms/generation";
import {
  MazeDifficultyFeatures,
  PathsMetrics,
  PathOverlapMetrics,
} from "../../../lib/maze/metrics/types";
import { Maze, Position } from "../../../lib/maze/types";

export interface MazeBenchmark {
  name: string;
  id: number;
  algorithm: AlgorithmType;
  maze: Maze;
      paths: Position[][];

  metrics: {
    totalIntersections: number;
    totalPaths: number;
    shortestPathLength: number;
    mazeDifficultyFeatures: MazeDifficultyFeatures;
    pathsMetrics: PathsMetrics;
    pathOverlapMetrics: PathOverlapMetrics;
  };
}
