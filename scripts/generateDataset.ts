import { generateBenchmarks } from "@/lib/maze/dataset/generateBenchmark";
import { saveBenchmarks } from "@/lib/maze/dataset/saveBenchmarks";

const configs = [
  { rows: 20, cols: 20, samples: 50 },
  { rows: 30, cols: 30, samples: 50 },
  { rows: 40, cols: 40, samples: 50 },
];

for (const config of configs) {
  const benchmarks = generateBenchmarks(
    config.rows,
    config.cols,
    config.samples,
  );

  const fileName = `${config.rows}x${config.cols}.json`;

  saveBenchmarks(
    `./src/lib/maze/benchmark/rawData/generated/${fileName}`,
    benchmarks,
  );

  console.log(
    `Generated ${benchmarks.length} mazes -> ${fileName}`,
  );
}