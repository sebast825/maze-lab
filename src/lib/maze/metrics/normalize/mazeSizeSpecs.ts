import { MazeSizeSpecKey, MazeSizeSpecValues, MetricLimits } from "./types";
import MazeSizeSpecsValues from "./mazeSizeSpecs.json";

/**
 * Maps the total cell count to the closest available benchmark size specification.
 */
export const getClosestSizeKey = (totalCells: number): MazeSizeSpecKey => {
  const sizeMap: Record<MazeSizeSpecKey, number> = {
    "10x10": 100,
    "20x20": 400,
    "30x30": 900,
    "40x40": 1600,
    "60x60": 3600,
  };
  return (Object.entries(sizeMap) as [MazeSizeSpecKey, number][]).reduce(
    (closest, [key, cells]) => {
      return Math.abs(cells - totalCells) <
        Math.abs(sizeMap[closest] - totalCells)
        ? key
        : closest;
    },
    "10x10" as MazeSizeSpecKey,
  );
};

export const MazeSizeSpecs: Record<MazeSizeSpecKey, MazeSizeSpecValues> =
  MazeSizeSpecsValues;
