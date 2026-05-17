import { AlgorithmType } from "@/lib/alogirthms/generation";
import { algorithmLabels } from "./constants";

interface MenuProps {
  algorithm: AlgorithmType;
  onAlgorithmChange: (algorithm: AlgorithmType) => void;
  rows: number;
  onRowsChange: (rows: number) => void;
  cols: number;
  onColsChange: (cols: number) => void;
  onGenerate: () => void;
  onExportPDF?: () => void;
  onClear?: () => void;
  onShowPath: () => void;
  showPath: boolean;
}

export const Menu = ({
  algorithm,
  onAlgorithmChange,
  rows,
  onRowsChange,
  cols,
  onColsChange,
  onGenerate,
  onExportPDF,
  onClear,
  onShowPath,
  showPath,
}: MenuProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-md">
      {/* Algoritmo */}
      <div className="flex items-center gap-2">
        <label htmlFor="algorithm" className="text-white font-medium">
          Algoritmo:
        </label>
        <select
          id="algorithm"
          value={algorithm}
          onChange={(e) => {
            onAlgorithmChange(e.target.value as AlgorithmType);
            onGenerate();
          }}
          className="px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(algorithmLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
    
      {/* Tamaño */}
      <div className="flex items-center gap-2">
        <label htmlFor="rows" className="text-white font-medium">
          Rows:
        </label>
        <input
          type="number"
          id="rows"
          value={rows}
          onChange={(e) => onRowsChange(parseInt(e.target.value))}
          min={5}
          max={50}
          className="w-16 px-2 py-2 bg-gray-700 text-white rounded-md border border-gray-600 text-center"
        />
        <label htmlFor="cols" className="text-white font-medium">
          Cols:
        </label>
        <input
          type="number"
          id="cols"
          value={cols}
          onChange={(e) => onColsChange(parseInt(e.target.value))}
          min={5}
          max={50}
          className="w-16 px-2 py-2 bg-gray-700 text-white rounded-md border border-gray-600 text-center"
        />
      </div>

      {/* Botones */}
      <button
        onClick={onGenerate}
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
      >
        Generate
      </button>
  <button
        onClick={onShowPath}
        className="px-4 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition"
      >
        {showPath ? "Hide Path" : "Show Path"}
      </button>
      <button
        onClick={onExportPDF}
        className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition"
      >
        Export PDF
      </button>

      <button
        onClick={onClear}
        className="px-4 py-2 bg-yellow-600 text-white font-medium rounded-md hover:bg-yellow-700 transition"
      >
        Clear
      </button>
    </div>
  );
};
