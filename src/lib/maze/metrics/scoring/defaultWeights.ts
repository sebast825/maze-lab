import { Weights } from "./types";

export const defaultWeights: Weights = {
  features: {
    ambiguity: 1,
    averageDeadEndCost: 1.1,
    averageDecisionCost: 0.2,
    decisionPenalty: 1,
    tortuosity: 1,
    total: 1,
  },
  paths: {
    maxTortuosity: 1,
    minTortuosity: 1,
    avgTortuosity: 1,
    avgTurnDensity: 0.5,
    shortestPathTurnDensity: 3,
    total: 1,
  },
  pathOverlaps: {
    repeatedOccurrences: 0.8,
    uniqueCellCount: 1.5,
    total: 1,
  },
  totalIntersections: 1,
};
