
export interface Weights {
  features: {
    ambiguity:number;
    averageDeadEndCost: number;
    averageDecisionCost: number;
    decisionPenalty: number;
    tortuosity: number;
    total: number;
  };
  paths: {
    maxTortuosity: number;
    minTortuosity: number;
    avgTortuosity: number;
    avgTurnDensity: number;
    shortestPathTurnDensity: number;
    total: number;
  };
  pathOverlaps: {
    repeatedOccurrences: number;
    uniqueCellCount: number;
    total: number;
  };
  totalIntersections : number
}