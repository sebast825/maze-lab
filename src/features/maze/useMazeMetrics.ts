import { useState } from "react";
import { bfs } from "@/lib/algorithms/solving/bfs";
import { BFSResult } from "@/lib/algorithms/solving/types";
import { computeMazeMetrics } from "@/lib/metrics";
import { MazeData } from "@/lib/maze/types";
import { MazeScoringResult } from "@/lib/metrics/scoring/types";

export const useMazeMetrics = () => {
  const [metrics, setMetrics] = useState<MazeScoringResult | null>(null);

  const calculateMetrics = (mazeData: MazeData): MazeScoringResult => {
    const { cellInfo }: BFSResult = bfs(
      mazeData.maze,
      mazeData.end,
      mazeData.start,
    );

    const result = computeMazeMetrics(
      cellInfo,
      mazeData.maze,
      mazeData.solution!,
    );
    setMetrics(result);

    return result;
  };

  return {
    metrics,
    calculateMetrics,
  };
};
