import { IconButton } from "@/components/iconButton";
import { Undo2, Trash2, Pencil, Gamepad2 } from "lucide-react";
import { AnalysisMode } from "../types";

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

    </div>
  );
};
