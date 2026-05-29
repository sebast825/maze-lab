import { CellInfo } from "@/lib/alogirthms/solving/types";
import { Position } from "../../types";
import { DecisionPenaltyAnalysis } from "../types";

export const analyzeDecisionPenalty = (
  neighbors: Position[],
  cellsInfo: CellInfo[][],
): DecisionPenaltyAnalysis => {
  const distances: number[] = neighbors.map(
    (n) => cellsInfo[n.row][n.col].distance,
  );
  const minDistance: number = Math.min(...distances);
  // Distance difference from the optimal branch.

  const penalties: number[] = distances.map((d) => d - minDistance);

  const sortedDistances = [...distances].sort((a, b) => a - b);
  // Separation between the best and second-best branch.
  // Lower value = higher ambiguity.
  const ambiguity = sortedDistances[1] - minDistance;
  return { penalties, ambiguity };
};
