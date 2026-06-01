import { Weights } from "./types";

export const defaultWeights: Weights = {
  features: {
    ambiguity: 1,
    deadEndAvg: 1.1,
    decisionAvg: 2,
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
    uniqueCellCount: .2,
    //mantain  low in case share almost all path has not big influence
    repeatedOccurrences: 0.05,
    total: 1,
    avgRedundantLength: 2,
    maxRedundantLength: .5
  },

  global: {
    intersectionPenalty: 1,
  },
};