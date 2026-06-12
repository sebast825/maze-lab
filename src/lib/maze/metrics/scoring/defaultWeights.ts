import { Weights } from "./types";

export const defaultWeights: Weights = {
  features: {
    deadEndAvg: 0.3,
    decisionEndAvg: 0.4,
    tortuosityAvg: 0.3,
    total: 1,
  },

  paths: {
    shortestPathTortuosity: .3,
    shortestPathLength: .2,
    shortestPathDecisionNodes: .2,
    shortestPathWallRatio:.3,

    total: 1,
  },

  pathsAlternative: {
    repeatRatio: 0.5,
    avgPathDetourRatio: 0.5,
    total: 1,
  },

  global: {
    intersectionPenalty: 1,
  },
};
