// features/maze-analysis/components/BenchmarkSelector.tsx

import { RawDataSize, rawDataSelector } from "@/lib/maze/benchmark";
import { MazeBenchmark } from "@/lib/maze/benchmark/types";



interface BenchmarkSelectorProps {
  selectedId: number | string;
  benchmarks: MazeBenchmark[];
  onChange: (id: number | string) => void;
  size: RawDataSize;
  onSizeChange: (e: RawDataSize) => void;
}

export const BenchmarkSelector = ({
  selectedId,
  benchmarks,
  onChange,
  size,
  onSizeChange,
}: BenchmarkSelectorProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
      <div className="flex items-center gap-2">
        <label htmlFor="size" className="text-white font-medium">
          Size:
        </label>
        <select
          id="size"
          value={size}
          onChange={(e) => {
            onSizeChange(e.target.value as RawDataSize);
          }}
          className="px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.keys(rawDataSelector).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <label
        htmlFor="benchmark-select"
        className="text-white font-medium whitespace-nowrap"
      >
        Benchmark:
      </label>

      <select
        id="benchmark-select"
        value={selectedId}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : "")}
        /* Se agregó w-full para que en mobile use el ancho disponible sin romper, y max-w-xs para que no sea gigante en pantallas grandes */
        className="w-full sm:w-auto max-w-xs px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select maze</option>

        {benchmarks.map((benchmark) => (
          <option key={benchmark.id} value={benchmark.id}>
            {benchmark.name} - {benchmark.algorithm}
          </option>
        ))}
      </select>
    </div>
  );
};
