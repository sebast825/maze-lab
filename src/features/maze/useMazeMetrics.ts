import { useState } from "react";
import { bfs } from "@/lib/alogirthms/solving/bfs";
import { BFSResult } from "@/lib/alogirthms/solving/types";
import { computeMazeMetrics } from "@/lib/maze/metrics";
import { MazeData } from "@/lib/maze/types";
import { MazeScoringResult } from "@/lib/maze/metrics/scoring/types";

export const useMazeMetrics = () => {
  const [metrics, setMetrics] = useState<MazeScoringResult | null>(null);

  const calculateMetrics = (mazeData: MazeData) => {
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
