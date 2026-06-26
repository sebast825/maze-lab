import { DifficultyBadge } from "@/features/mazeDifficulty/difficultyBadge";
import { NavbarProps } from "./types";
import { NAV_CLASSES } from "./styles";
import { ActionButton } from "../actionButton";
import { AlgorithmSelector } from "./algorithmSelector";
import { SizeControls } from "./sizeControls";

interface MobileMenuProps extends NavbarProps {
  isOpen: boolean;
}

export const MobileMenu = ({
  isOpen,
  algorithm,
  setAlgorithm,
  rows,
  setRows,
  cols,
  setCols,
  handleGenerate,
  showPath,
  setShowPath,
  handleExportToPDF,
  mazeData,
  gameMode,
  setGameMode,
  handleUndoDraw,
  handleClearDraw,
  total,
}: MobileMenuProps) => {
  return (
    <div
      className={`md:hidden transition-all duration-200 ease-in-out overflow-hidden ${
        isOpen
          ? "max-h-[80vh] opacity-100 overflow-y-auto"
          : "max-h-0 opacity-0"
      }`}
    >
      <div className={NAV_CLASSES.mobileContainer}>
        <AlgorithmSelector
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          onGenerate={handleGenerate}
          className="flex-col gap-1"
        />

        <SizeControls
          rows={rows}
          setRows={setRows}
          cols={cols}
          setCols={setCols}
          isMobile
        />
        <ActionButton color="orange" variant="text" onClick={handleGenerate}>
          [Generate Maze]
        </ActionButton>

        <div className="border-t border-slate-700 w-full"></div>

        <div className="flex flex-row gap-3">
          <ActionButton
            color="slate"
            variant="text"
            disabled={!mazeData}
            onClick={() => setShowPath(!showPath)}
          >
            {showPath ? "Hide Path" : "Show Path"}
          </ActionButton>
          <span>|</span>
          <ActionButton
            color="slate"
            variant="text"
            disabled={!mazeData}
            onClick={() => handleExportToPDF(mazeData!, cols)}
          >
            Export PDF
          </ActionButton>
        </div>
        {total && (
          <div className="sm:hidden w-full flex justify-center pb-2 border-t border-slate-700 pt-2">
            <DifficultyBadge score={total} />
          </div>
        )}
        {/* {mazeData && (
          <ModeControls
            gameMode={gameMode}
            setGameMode={setGameMode}
            isMobile
            onUndo={handleUndoDraw}
            onClear={handleClearDraw}
          />
        )} */}
      </div>
    </div>
  );
};
