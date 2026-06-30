import { ActionButton } from "@/components/actionButton";
import { ActionDropdown } from "@/components/actionDropdown";
import { AlgorithmSelector } from "@/features/maze/mazeGenerator/components/navBar/algorithmSelector";
import { ModeControls } from "@/features/maze/mazeGenerator/components/navBar/modeControls";
import { ShareMazeButton } from "@/components/navBar/ShareMazeButton";
import { SizeControls } from "@/features/maze/mazeGenerator/components/navBar/sizeControls";
import { NavbarProps } from "./types";
import { GameMode } from "@/features/maze/types";


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
  handleExportToPDF,
  mazeData,
  gameMode,
  setGameMode,
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

      <ActionDropdown label="Actions">
        <ActionButton
          color="slate"
          variant="text"
          disabled={!mazeData}
          onClick={() => {
            setShowPath(!showPath);
          }}
          className="w-full !justify-start text-left normal-case"
        >
          {showPath ? "Hide_Path" : "Show_Path"}
        </ActionButton>
        <ActionButton
          color="slate"
          variant="text"
          disabled={!mazeData}
          onClick={() => handleExportToPDF(mazeData!, cols)}
          className="w-full !justify-start text-left normal-case"
        >
          Export_PDF
        </ActionButton>
        <ShareMazeButton mazeData={mazeData} className="w-full !justify-start text-left normal-case" />
      </ActionDropdown>

      {mazeData && (
        <ModeControls
          gameMode={gameMode}
          setGameMode={setGameMode}
          onUndo={handleUndoDraw}
          onClear={handleClearDraw}
        />
      )}
    </div>
  );
};