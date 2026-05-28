import { CellInfo } from "@/lib/alogirthms/solving/types";
import { Position } from "../../types";
import { DecisionPenaltyAnalysis } from "../types";

export const analyzeDecisionPenalty = (
  neighbors: Position[],
  cellsInfo: CellInfo[][],
): DecisionPenaltyAnalysis=> {
  const distances: number[] = neighbors.map(
    (n) => cellsInfo[n.row][n.col].distance,
  );
  const minDistance: number = Math.min(...distances);
  const penalties: number[] = distances.map((d) => d - minDistance);

  const sortedDistances = [...distances].sort((a, b) => a - b);
  const ambiguity =  sortedDistances[1] - minDistance
  return {penalties,ambiguity};
 
};
