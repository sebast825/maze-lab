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

export interface MetricStats {
  metric: string;
  min: number;
  p5: number;
  p25: number;
  p50: number;
  avg: number;
  p75: number;
  p95: number;
  max: number;
}

export interface BenchmarkMetricRow {
  id: number;
  name: string;

  totalIntersections: number;
  totalPaths: number;
  shortestPathLength: number;

  decisionPenalty: number;
  tortuosity: number;

  deadEndBranchLength: number;
  decisionBranchLength: number;

  deadEndBranchCount: number;
  decisionBranchCount: number;

  totalBranches: number;

  avgDecisionPenalty: number;
  avgBranchTortuosity: number;

  avgDeadEndLength: number;
  avgDecisionLength: number;

  avgTortuosity: number;
  shortestPathTortuosity: number;

  repeatRatio: number;
  avgPathDetourRatio: number;
  maxPathDetourRatio: number;
}
