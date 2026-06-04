import fs from "fs";
import { MazeBenchmark } from "../benchmark/types";

export const saveBenchmarks = (
  filePath: string,
  benchmarks: MazeBenchmark[],
) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(
      benchmarks,
      null,
      2,
    ),
  );
};