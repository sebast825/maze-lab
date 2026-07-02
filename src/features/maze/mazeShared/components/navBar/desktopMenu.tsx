import { ActionButton } from "@/components/actionButton";
import { GameMode } from "@/features/maze/types";
import { useNavigation } from "@/hooks/useNavigation";
import { NavbarProps } from "./types";
import { MenuActionsDesktop } from "@/features/maze/mazeEditor/components/menu/desktop";


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


      <MenuActionsDesktop mazeData={mazeData} showPath={showPath} setShowPath={setShowPath} gameMode={gameMode}
        cols={cols} setGameMode={setGameMode} handleUndoDraw={() => handleUndoDraw()} handleClearDraw={handleClearDraw} />
    </div>
  );
};