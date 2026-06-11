import { Weights } from "./types";

export const defaultWeights: Weights = {
  features: {
    deadEndAvg: 1,
    decisionEndAvg: 1,
    tortuosityAvg: 1,
    total: 1,
  },

  paths: {
    avgTortuosity: 1,
    shortestPathTortuosity: 1,

    shortestPathLength:1,
    shortestPathDecisionNodes:1,
    total: 1
  },

  pathsAlternative: {
    repeatRatio:1,
    avgPathDetourRatio:1,
    total: 1,
   
  },

  global: {
    intersectionPenalty: 1,
  },
};