import benchmark30x30 from "./rawData/manual/30x30.json";
import benchmark40x40 from "./rawData/manual/40x40.json";
import benchmark20x20 from "./rawData/manual/20x20.json";

import benchmarkGenerated30x30 from "./rawData/generated/30x30.json";
import benchmarkGenerated40x40 from  "./rawData/generated/40x40.json";
import benchmarkGenerated20x20 from "./rawData/generated/20x20.json";

import { MazeBenchmark } from "./types";

export const rawDataManualSelector: Record<RawDataSize, MazeBenchmark[]> = {
  "20*20": benchmark20x20 as MazeBenchmark[],
  "30*30": benchmark30x30 as MazeBenchmark[],
  "40*40": benchmark40x40 as MazeBenchmark[],
};


export const rawDataGeneratedSelector: Record<RawDataSize, MazeBenchmark[]> = {
  "20*20": benchmarkGenerated20x20 as MazeBenchmark[],
  "30*30": benchmarkGenerated30x30 as MazeBenchmark[],
  "40*40": benchmarkGenerated40x40 as MazeBenchmark[],
};

export type RawDataSize = "20*20" | "30*30" | "40*40";

