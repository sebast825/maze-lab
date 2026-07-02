import { ActionButton } from "@/components/actionButton";
import { ActionDropdown } from "@/components/actionDropdown";
import { AlgorithmSelector } from "@/features/maze/mazeGenerator/components/navBar/algorithmSelector";
import { ModeControls } from "@/features/maze/mazeGenerator/components/navBar/modeControls";
import { ShareMazeButton } from "@/components/navBar/ShareMazeButton";
import { SizeControls } from "@/features/maze/mazeGenerator/components/navBar/sizeControls";
import { NavbarProps } from "./types";
import { GameMode } from "@/features/maze/types";
import { openMazeInEditor } from "../../../mazeEditor/components/menu/helpers";
import { MenuActionsDesktop } from "@/features/maze/mazeEditor/components/menu/desktop";


interface DesktopMenuProps extends NavbarProps {
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  handleUndoDraw: () => void;
  handleClearDraw: () => void;
}

export const DesktopMenu = ({
  algorithm,
  setAlgorithm,
  rows,
  setRows,
  cols,
  setCols,
  handleGenerate,
  showPath,
  setShowPath,
  mazeData,
  setGameMode,
  gameMode,
  handleUndoDraw,
  handleClearDraw,
}: DesktopMenuProps) => {


  return (
    <div className="hidden md:flex flex-wrap space-x-6 items-center text-xs font-mono uppercase tracking-wider gap-2 relative">
      <AlgorithmSelector
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
      />

      <ActionButton color="orange" variant="text" onClick={handleGenerate}>
        [Generate]
      </ActionButton>

      <SizeControls
        rows={rows}
        setRows={setRows}
        cols={cols}
        setCols={setCols}
      />


      <MenuActionsDesktop mazeData={mazeData} showPath={showPath} setShowPath={setShowPath} gameMode={gameMode}
        cols={cols} setGameMode={setGameMode} handleUndoDraw={() => handleUndoDraw()} handleClearDraw={handleClearDraw} />
    </div>
  );
};