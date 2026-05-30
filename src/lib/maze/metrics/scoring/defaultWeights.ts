import { Weights } from "./types";

export const defaultWeights: Weights = {
  features: {
    ambiguity: 1,
    deadEndAvg: 1.1,
    decisionAvg: 0.2,
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

  overlaps: {
    uniqueCellCount: 1.5,
    repeatedOccurrences: 0.8,
    total: 1,
  },

  global: {
    intersectionPenalty: 1,
  },
};