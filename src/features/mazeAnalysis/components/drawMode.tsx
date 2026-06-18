import { IconButton } from "@/components/iconButton";
import { Undo2, Trash2, Pencil, Gamepad2 } from "lucide-react";
import { AnalysisMode } from "../types";
import { DrawControls } from "@/components/drawControls";
import { clear } from "console";
import { ActionButton } from "@/components/actionButton";

interface DrawModeProps {
  currentMode: AnalysisMode;
  toggleDraw: () => void;
  drawCanvas: boolean;
  undoLast: () => void;
  clearAll: () => void;
}
export const DrawMode = ({
  toggleDraw,
  currentMode,
  drawCanvas,
  undoLast,
  clearAll,
}: DrawModeProps) => {
  return (
    <div className="flex items-center gap-2 ">
      {drawCanvas && (
        <DrawControls onUndo={undoLast} onClear={clearAll}></DrawControls>
      )}
      <ActionButton
        color={currentMode === "DRAW" ? "orange" : "rose"}
        variant="outline"
        onClick={toggleDraw}
        title="Undo"
      >
        <Pencil className="w-5 h-5" />
      </ActionButton>
    </div>
  );
};
