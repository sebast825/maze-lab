// features/maze-analysis/components/BenchmarkSelector.tsx

import { MazeBenchmark } from "@/features/mazeAnalysis/benchmarkData/types";

interface BenchmarkSelectorProps {
  selectedId: number | string;
  benchmarks: MazeBenchmark[];
  onChange: (id: number | string) => void;
}

export const BenchmarkSelector = ({
  selectedId,
  benchmarks,
  onChange,
}: BenchmarkSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="benchmark-select"
        className="text-white font-medium whitespace-nowrap"
      >
        Benchmark:
      </label>

      <select
        id="benchmark-select"
        value={selectedId}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : "")
        }
        className="px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select maze</option>

        {benchmarks.map((benchmark) => (
          <option key={benchmark.id} value={benchmark.id}>
            {benchmark.name}
          </option>
        ))}
      </select>
    </div>
  );
};