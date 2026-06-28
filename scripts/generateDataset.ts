import { generateBenchmarks } from "@/lib/infrastructure/benchmark/dataset/generateBenchmark";
import { saveBenchmarks } from "@/lib/infrastructure/benchmark/dataset/saveBenchmarks";

const configs = [
  // { rows: 20, cols: 20, samples: 50 },
  // { rows: 30, cols: 30, samples: 50 },
  // { rows: 40, cols: 40, samples: 50 },
  //   { rows: 10, cols: 10, samples: 10 },
  // { rows: 100, cols: 100, samples: 10 },
    { rows: 4, cols: 4, samples: 1 },

];

for (const config of configs) {
  const benchmarks = generateBenchmarks(
    config.rows,
    config.cols,
    config.samples,
  );

  const fileName = `${config.rows}x${config.cols}.json`;

  saveBenchmarks(
    `./dataset/generated/${fileName}`,
    benchmarks,
  );

  console.log(
    `Generated ${benchmarks.length} mazes -> ${fileName}`,
  );

}