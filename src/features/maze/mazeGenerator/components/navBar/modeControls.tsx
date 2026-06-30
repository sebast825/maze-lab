import { Pencil, Gamepad2} from "lucide-react";
import { GameMode } from "@/features/maze/types";
import { DrawControls } from "@/components/drawControls";

interface ModeControlsProps {
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  isMobile?: boolean;
  onUndo: () => void;
  onClear: () => void;
}

export const ModeControls = ({
  gameMode,
  setGameMode,
  isMobile = false,
  onUndo,
  onClear,
}: ModeControlsProps) => {
  const containerClass = isMobile
    ? "flex items-center gap-6 pt-2 border-t border-slate-900 w-full justify-center"
    : "flex items-center gap-4 border-l border-slate-900 pl-4 h-4";

  return (
    <div className={containerClass}>
      {gameMode == "DRAW" && (
        <DrawControls onUndo={onUndo} onClear={onClear}></DrawControls>
      )}

      <button
        onClick={() => setGameMode(gameMode !== "DRAW" ? "DRAW" : "VIEW")}
        className={`transition-colors cursor-pointer ${
          gameMode === "DRAW"
            ? "text-orange-400"
            : "text-slate-500 hover:text-slate-300"
        }`}
        title="Draw Mode"
      >
        <Pencil className="w-5 h-5" />
      </button>

      <button
        onClick={() =>
          setGameMode(gameMode !== "CHARACTER" ? "CHARACTER" : "VIEW")
        }
        className={`transition-colors cursor-pointer ${
          gameMode === "CHARACTER"
            ? "text-orange-400"
            : "text-slate-500 hover:text-slate-300"
        }`}
        title="Character Mode"
      >
        <Gamepad2 className="w-5 h-5" />
      </button>
    </div>
  );
};
