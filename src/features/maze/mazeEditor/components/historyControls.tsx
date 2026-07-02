import { Undo2, Redo2 } from "lucide-react";

interface HistoryControlsProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const HistoryControls = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: HistoryControlsProps) => {


  return (
    <div className="flex items-center justify-center gap-4 border-l border-slate-900 pl-4 h-4">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`transition-colors cursor-pointer ${canUndo
          ? "text-slate-500 hover:text-slate-300"
          : "text-slate-700 cursor-not-allowed opacity-50"
          }`}
        title="Undo"
      >
        <Undo2 className="w-5 h-5" />
      </button>

      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={`transition-colors cursor-pointer ${canRedo
          ? "text-slate-500 hover:text-slate-300"
          : "text-slate-700 cursor-not-allowed opacity-50"
          }`}
        title="Redo"
      >
        <Redo2 className="w-5 h-5" />
      </button>
    </div>
  );
};