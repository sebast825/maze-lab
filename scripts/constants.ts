
export const metricsToAnalyze = [
  "avgDeadEndLength",
  "avgDecisionLength",
  "tortuosityFeatureAvg",
  "avgTortuosity",
  "shortestPathTortuosity",
  "repeatRatio",
  "avgPathDetourRatio",
  "shortestPathLength",
  "shortestPathDecisionNodes",
] as const;

export const metricMap: Record<string, string> = {
  avgDeadEndLength: "deadEndAvg",
  avgDecisionLength: "decisionEndAvg",
  tortuosityFeatureAvg: "tortuosityFeatureAvg",
  avgTortuosity: "avgTortuosity",
  shortestPathTortuosity: "shortestPathTortuosity",
  repeatRatio: "repeatRatio",
  avgPathDetourRatio: "avgPathDetourRatio",
  shortestPathLength: "shortestPathLength",
  shortestPathDecisionNodes: "shortestPathDecisionNodes",
};
