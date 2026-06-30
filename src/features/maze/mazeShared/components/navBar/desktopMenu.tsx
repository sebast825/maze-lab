import { ActionButton } from "@/components/actionButton";
import { ActionDropdown } from "@/components/actionDropdown";
import { ModeControls } from "@/features/maze/mazeGenerator/components/navBar/modeControls";
import { ShareMazeButton } from "@/components/navBar/ShareMazeButton";
import { GameMode } from "@/features/maze/types";
import { useNavigation } from "@/hooks/useNavigation";
import { NavbarProps } from "./types";


interface DesktopMenuProps extends NavbarProps {
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  handleUndoDraw: () => void;
  handleClearDraw: () => void;

}

export const DesktopMenu = ({
  cols,
  showPath,
  setShowPath,
  handleExportToPDF,
  mazeData,
  gameMode,
  setGameMode,
  handleUndoDraw,
  handleClearDraw,
}: DesktopMenuProps) => {

  const { goToHome } = useNavigation()
  return (
    <div className="hidden md:flex flex-wrap space-x-6 items-center text-xs font-mono uppercase tracking-wider gap-2 relative">
      <ActionButton color="orange" variant="text" onClick={() => goToHome()}>
        [Generate]
      </ActionButton>

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