import { useEffect, useState } from "react";
import { bfs, reconstructPath } from "@/lib/alogirthms/solving/bfs";
import { BFSResult } from "@/lib/alogirthms/solving/types";
import { computeMazeMetrics } from "@/lib/maze/metrics";
import { MazeData } from "@/lib/maze/types";
import { MazeScoringResult } from "@/lib/maze/metrics/scoring/types";
import { benchmark20x20 } from "../mazeAnalysis/benchmarkData/rawData/benchmark20x20";
import { MazeBenchmark } from "../mazeAnalysis/benchmarkData/types";

export const useMazeMetrics = () => {
  const [metrics, setMetrics] = useState<MazeScoringResult | null>(null);

  const calculateMetrics = (mazeData: MazeData) => {
    const { cellInfo, shortest }: BFSResult = bfs(
      mazeData.maze,
      mazeData.end,
      mazeData.start,
    );

    const shortestPath = reconstructPath(cellInfo, shortest);

    const result = computeMazeMetrics(
      cellInfo,
      mazeData.maze,
      mazeData.solution!,
      shortestPath.length,
    );
    setMetrics(result);

    return result;
  };

  return {
    metrics,
    calculateMetrics,
  };
};
