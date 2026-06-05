import { Weights } from "./types";

export const defaultWeights: Weights = {
  features: {
    deadEndAvg: 1.1,
    decisionEndAvg: 2,
    decisionPenalty: 1,
    tortuosity: 1,
    total: 1,
  },

  paths: {
    avgTortuosity: 1,
    avgTurnDensity: 0.5,
    shortestPathTurnDensity: 3,
    total: 1
  },

  overlaps: {
    repeatRatio:1,
    avgPathDetourRatio:1,
    total: 1,
   
  },

  global: {
    intersectionPenalty: 1,
  },
};