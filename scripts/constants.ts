export const metricsToAnalyze = [
  "avgDeadEndLength",
  "avgDecisionLength",
  "tortuosityFeatureAvg",
  "shortestPathTortuosity",
  "repeatRatio",
  "avgPathDetourRatio",
  "shortestPathLength",
  "shortestPathDecisionNodes",
  "shortestPathWallRatio"

] as const;


export const metricMap: Record<string, string> = {
  avgDeadEndLength: "deadEndAvg",
  avgDecisionLength: "decisionEndAvg",
  tortuosityFeatureAvg: "tortuosityFeatureAvg",
  shortestPathTortuosity: "shortestPathTortuosity",
  repeatRatio: "repeatRatio",
  avgPathDetourRatio: "avgPathDetourRatio",
  shortestPathLength: "shortestPathLength",
  shortestPathDecisionNodes: "shortestPathDecisionNodes",
    shortestPathWallRatio:"shortestPathWallRatio"
};
