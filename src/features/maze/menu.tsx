import { AlgorithmType } from "@/lib/alogirthms/generation";
import { algorithmLabels } from "./constants";
import { ActionButton } from "@/components/actionButton";
import { IconButton } from "@/components/iconButton";
import { Pencil, Undo2, Trash2, Gamepad2 } from "lucide-react";
import { GameMode } from "@/app/page";



interface ControlsProps {
  algorithm: AlgorithmType;
  onAlgorithmChange: (algorithm: AlgorithmType) => void;
  rows: number;
  onRowsChange: (rows: number) => void;
  cols: number;
  onColsChange: (cols: number) => void;
  onGenerate: () => void;
}

export const Controls = ({
  algorithm,
  onAlgorithmChange,
  rows,
  onRowsChange,
  cols,
  onColsChange,
  onGenerate,
}: ControlsProps) => {
  return (
    <>
      {/* Algoritmo */}
      <div className="flex items-center gap-2">
        <label htmlFor="algorithm" className="text-white font-medium">
          Algorithm:
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
    </>
  );
};

interface ActionsProps {
  generateMaze: () => void;
  onShowPath: () => void;
  showPath: boolean;
  exportToPDF: () => void;
  disableExportToPDF: boolean;
}
export const Actions = ({
  generateMaze,
  onShowPath,
  showPath,
  exportToPDF,
  disableExportToPDF,
}: ActionsProps) => {
  return (
    <div className="flex items-center gap-4">
      <ActionButton action={generateMaze} text="Generate" color="blue" />

      <ActionButton
        action={onShowPath}
        disable={disableExportToPDF}
        text={showPath ? "Hide Path" : "Show Path"}
        color="purple"
      />

      <ActionButton
        action={exportToPDF}
        disable={disableExportToPDF}
        text=" Export PDF"
        color="green"
      />
    </div>
  );
};

interface MenuModesProps {
  currentMode: GameMode;
  toggleDraw: () => void;
  toggleCharacter: () => void;
  drawCanvas: boolean;
  undoLast: () => void;
  clearAll: () => void;
}
export const Modes = ({
  toggleDraw,
  currentMode,
  toggleCharacter,
  drawCanvas,
  undoLast,
  clearAll,
}: MenuModesProps) => {
  return (
    <div className="flex items-center gap-2">
      {drawCanvas && (
        <div className="flex items-center gap-2">
          <IconButton action={undoLast} color="slate" size="sm">
            <Undo2 className="w-4 h-4" />
          </IconButton>
          <IconButton action={clearAll} color="rose" size="sm">
            <Trash2 className="w-4 h-4" />
          </IconButton>
        </div>
      )}

      <IconButton
        action={toggleDraw}
        color={currentMode === "DRAW" ? "orange" : "blue"}
      >
        <Pencil className="w-5 h-5" />
      </IconButton>
      <IconButton
        action={toggleCharacter}
        color={currentMode === "CHARACTER" ? "orange" : "blue"}
      >
        <Gamepad2 className="w-5 h-5" />
      </IconButton>
    </div>
  );
};
