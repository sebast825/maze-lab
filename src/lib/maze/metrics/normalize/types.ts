import { MazeDerivedMetrics } from "../scoring/types";

export interface MetricLimits {
  p5: number;
  p95: number;
}

export type MazeSizeSpecKey = "10x10" | "20x20" | "30x30" | "40x40" | "60x60";

export type MazeNormalizedMetrics = MazeDerivedMetrics;

export interface MazeSizeSpecValues {
  deadEndAvg: MetricLimits;
  decisionEndAvg: MetricLimits;
  tortuosityFeatureAvg: MetricLimits;
  shortestPathTortuosity: MetricLimits;
  repeatRatio: MetricLimits;
  avgPathDetourRatio: MetricLimits;
  shortestPathDecisionNodes: MetricLimits;
  shortestPathLength : MetricLimits;
    shortestPathWallRatio: MetricLimits;

}