import { CellInfo } from "@/lib/alogirthms/solving/types";
import { Position } from "../../types";
import { CellMetric } from "../types";

export const analyzeDecisionPenalty = (
  current: Position,
  neighbors: Position[],
  cellsInfo: CellInfo[][],
): CellMetric => {
  const distances: number[] = neighbors.map(
    (n) => cellsInfo[n.row][n.col].distance,
  );
  const minDistance: number = Math.min(...distances);
  const penalty: number[] = distances.map((d) => d - minDistance);
  return {
    neighbors: neighbors,
    position: current,
    distance: cellsInfo[current.row][current.col].distance,
    decisionPenalties: penalty,
    branchLengthPenalties: [],
  };
};
