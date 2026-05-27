import { CellInfo } from "@/lib/alogirthms/solving/types";
import { Position } from "../../types";

export const analyzeDecisionPenalty = (
  neighbors: Position[],
  cellsInfo: CellInfo[][],
): number[] => {
  const distances: number[] = neighbors.map(
    (n) => cellsInfo[n.row][n.col].distance,
  );
  const minDistance: number = Math.min(...distances);
  const penalty: number[] = distances.map((d) => d - minDistance);
  return penalty;
 
};
