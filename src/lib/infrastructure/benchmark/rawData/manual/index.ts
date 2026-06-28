import benchmark30x30 from "./30x30.json";
import benchmark40x40 from "./40x40.json";
import benchmark20x20 from "./20x20.json";
import { MazeBenchmark } from "../../types";

export type RawDataSize = "20*20" | "30*30" | "40*40";

export const rawDataManualSelector: Record<RawDataSize, MazeBenchmark[]> = {
  "20*20": benchmark20x20 as MazeBenchmark[],
  "30*30": benchmark30x30 as MazeBenchmark[],
  "40*40": benchmark40x40 as MazeBenchmark[],
};