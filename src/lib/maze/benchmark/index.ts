import benchmark30x30 from "./rawData/30x30.json";
import benchmark40x40 from "./rawData/40x40.json";
import benchmark20x20 from "./rawData/20x20.json";
import { MazeBenchmark } from "./types";

export const rawDataSelector: Record<RawDataSize, MazeBenchmark[]> = {
  "20*20": benchmark20x20 as MazeBenchmark[],
  "30*30": benchmark30x30 as MazeBenchmark[],
  "40*40": benchmark40x40 as MazeBenchmark[],
};

export type RawDataSize = "20*20" | "30*30" | "40*40";
