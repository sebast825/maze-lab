
import benchmarkGenerated30x30 from "./30x30.json";
import benchmarkGenerated40x40 from "./40x40.json";
import benchmarkGenerated20x20 from "./20x20.json";
import benchmarkGenerated10x10 from "./10x10.json";
import benchmarkGenerated60x60 from "./60x60.json";
import { MazeBenchmark } from "@/lib/infrastructure/benchmark/types";



export const rawDataGeneratedSelector: Record<
  RawDataSizeGenerated,
  MazeBenchmark[]
> = {
  "10*10": benchmarkGenerated10x10 as MazeBenchmark[],
  "20*20": benchmarkGenerated20x20 as MazeBenchmark[],
  "30*30": benchmarkGenerated30x30 as MazeBenchmark[],
  "40*40": benchmarkGenerated40x40 as MazeBenchmark[],
  "60*60": benchmarkGenerated60x60 as MazeBenchmark[],
};

export type RawDataSizeGenerated =
  | "10*10"
  | "20*20"
  | "30*30"
  | "40*40"
  | "60*60";
