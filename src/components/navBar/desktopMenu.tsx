import { ActionButton } from "../actionButton";
import { ActionDropdown } from "../actionDropdown";
import { AlgorithmSelector } from "./algorithmSelector";
import { ModeControls } from "./modeControls";
import { SizeControls } from "./sizeControls";
import { NavbarProps } from "./types";

interface DesktopMenuProps extends NavbarProps {}

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
    <div className="hidden md:flex flex-wrap space-x-6 items-center text-xs font-mono uppercase tracking-wider gap-2 ">
      <AlgorithmSelector
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        onGenerate={handleGenerate}
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
