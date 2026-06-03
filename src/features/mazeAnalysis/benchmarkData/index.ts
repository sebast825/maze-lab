import { benchmark20x20 } from "./rawData/benchmark20x20";
import { benchmark30x30 } from "./rawData/benchmark30x30";
import { benchmark40x40 } from "./rawData/benchmark40x40";

export const rawDataSelector = {
  "20*20": benchmark20x20,
  "30*30": benchmark30x30,
  "40*40": benchmark40x40
} as const;

export type RawDataSize = keyof typeof rawDataSelector;


